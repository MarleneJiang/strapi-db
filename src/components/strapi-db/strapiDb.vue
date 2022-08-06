<template>
    <view>
        <slot :data="slotData.dataList" :pagination="slotData.pagination" :loading="slotData.loading"
            :hasMore="slotData.hasMore" :error="slotData.errorMessage" />
    </view>
</template>

<script setup>

import { ref, reactive, onBeforeMount, watch, computed } from 'vue'
import axios from 'axios'
import qs from 'qs'


const props = defineProps({
    baseUrl: { // API接口地址
        type: String,
        default: 'https://strapi.marlenej.com/api'
    },
    // jwt: { // JWT token,保障用户权限
    //     type: String,
    //     default: '',
    // },
    collection: { // 表名
        type: String,
        default: ''
    },
    field: { // 指定要查询的字段
        type: [String, Array],
        default: ''
    },
    fliters: { // 查询条件
        type: Object,
        default: undefined
    },
    sort: { // 排序字段
        type: [String, Array],
        default: ''
    },
    populate: { // 关联查询
        type: [String, Array],
        default: ''
    },
    pageData: { // 分页策略选择
        type: String,
        default: 'add'
    },
    pageCurrent: { // 当前页 page
        type: Number,
        default: 1
    },
    pageSize: { // 每页数据数量 pageSize
        type: Number,
        default: 10
    },
    getCount: { // 是否查询数据条数 withCount
        type: Boolean,
        default: true
    },
    getOne: { // 是否只查询一条数据
        type: Number,
        default: undefined
    },
    distinct: { // 是否对数据去重
        type: Boolean,
        default: true
    },
    loadtime: {
        type: String,
        default: 'auto'
    }
})

const field_computed = computed(() => {
    return Array.isArray(props.field) ? props.field : [props.field]
})
const sort_computed = computed(() => {
    return Array.isArray(props.sort) ? props.sort : [props.sort]
})
const populate_computed = computed(() => {
    return Array.isArray(props.populate) ? props.populate : [props.populate]
})


/**
 * 相关配置
 */

const pageMode = { // pageData
    add: 'add',
    replace: 'replace'
}

const loadMode = { // loadtime
    auto: 'auto',
    onready: 'onready',
    manual: 'manual'
}

/**
 * 相关配置
 */






/**
 * 当前状态
 */

const slotData = reactive({
    dataList: [],
    pagination: {},
    loading: false,
    hasMore: false,
    errorMessage: {}
})
// slotData.pagination = {
//     page: props.pageCurrent,
//     pageSize: props.pageSize,
//     withCount: props.getCount
// }

// dataList: [],// 数据列表
// pagination: {},// 分页信息
// loading: false,// 是否加载中
// hasMore: false,// 是否有更多数据
// errorMessage: {}// 错误信息

/**
 * 当前状态
 */




/**
 * 
 * 组件传参
 * 
 */
const events = { // @load & @error
    load: 'load',
    error: 'error'
}
const emits = defineEmits(['load', 'error'])

/**
 * 
 * 组件传参
 * 
 */



/**
 * 
 * 主要部分
 * 
 */

// 接受并处理各种api参数的综合函数
const getParams = () => {
    const collection = props.collection // 表名
    const getOne = props.getOne // 是否指定查询

    // 分页
    let json = {
        pagination: slotData.pagination,
    }

    // 指定字段
    if (!!props.field) {
        json.field = field_computed
    }

    // 筛选
    if (!!props.fliters) {
        json.filters = props.fliters
    }

    // 排序
    if (!!props.sort) {
        json.sort = sort_computed
    }

    // 关联查询
    if (!!props.populate) {
        json.populate = populate_computed
    }




    const query = qs.stringify(json, {
        encodeValuesOnly: true, // prettify URL
    });

    return {
        collection,
        getOne,
        query,
    }

}

const getData = () => {
    const {
        collection,
        getOne,
        query,
    } = getParams()

    let url = `${collection}`
    if (!!getOne) {
        url += `/${getOne}`
    } else {
        url += `?${query}`
    }
    return ApiGet(url)
}

// 获取数据(梦的开始)
const loadData = (callback) => {
    if (slotData.loading) { // 如果已经正在处理，则不进行重复处理，防抖动操作
        return
    }
    slotData.loading = true // 开始加载
    slotData.errorMessage = '' // 清空错误信息
    getData().then(res => {
        slotData.loading = false // 加载完成
        loadDataSuccess(res.data)
    }).catch(err => {
        slotData.loading = false // 加载完成
        loadDataFail(err)
    })
}

// 获取数据成功后的处理函数
const loadDataSuccess = (res) => {


    if (props.pageData === pageMode.add) {
        slotData.dataList = slotData.dataList.concat(res.data)
    } else {
        slotData.dataList = res.data
    }
    if (props.distinct) {
        // 去重
        slotData.dataList = uniqueArray(slotData.dataList)
    }
    if (!!res.data) {
        slotData.pagination = res.meta.pagination
        if (props.pageData === pageMode.place) {
            slotData.hasMore = slotData.pagination.page < slotData.pagination.pageCount
        } else if (props.pageData === pageMode.add) {
            slotData.hasMore = slotData.dataList.length < slotData.pagination.total
        } else {
            slotData.hasMore = false
        }
    } else {
        slotData.errorMessage = res.error
    }
    emits(events.load, slotData.dataList, slotData.hasMore, slotData.pagination) // 成功回调，给父组件传递数据
}

// 获取数据失败后的处理函数
const loadDataFail = (err) => {
    slotData.errorMessage = err.response.data.error
    emits(events.error, err.response.data.error) // 失败回调，给父组件传递错误信息
    if (process.env.NODE_ENV === 'development') {
        console.error(err)
    }
}

/**
 * 
 * 主要部分
 * 
 */


/**
 * 
 * 网络请求
 * 
 */


const instance = axios.create({
    baseURL: props.baseUrl,
    timeout: 5000
})

const getToken = () => {
    if (!!props.jwt) {
        return 'Bearer ' + props.jwt
    } else {
        if (!!localStorage.getItem('jwt')) {
            return 'Bearer ' + localStorage.getItem('jwt')
        } else {
            return ''
        }
    }
}

instance.interceptors.request.use((config) => {
    config.headers['authorization'] = `${getToken()}`
    return config
})

const ApiGet = (path) => {
    const url = `${path}`
    return instance.get(url)
}

const ApiPost = (path, data, timeout = 5000) => {
    const url = `${path}`
    return instance.post(url, data, { timeout })
}

const ApiPut = (path, data, timeout = 5000) => {
    const url = `${path}`
    return instance.put(url, data, { timeout })
}

const ApiDelete = (path, data, timeout = 5000) => {
    const url = `${path}`
    return instance.delete(url, data, { timeout })
}




/**
 * 
 * 网络请求
 * 
 */







/**
 * 
 * 其他功能
 */

// 加载更多，但不重复请求
const loadMore = () => {
    if (slotData.loading) {
        return
    }
    slotData.pagination.page += 1 // 如果loadData失败，这里不会-1，之后可能会造成严重错误
    loadData()
}

// list去重
const uniqueArray = (arr) => {
    const res = new Map();
    return arr.filter(arr => !res.has(arr.id) && res.set(arr.id, arr.id));
}

// 登录
const login = (identifier, password) => {
    const loginData = {
        "identifier": identifier,
        "password": password
    }
    return new Promise((resolve, reject) => {
        ApiPost('auth/local', loginData).then(res => {
            localStorage.setItem('jwt', res.data.jwt)
            if (process.env.NODE_ENV === 'development') {
                console.log('JWT:', res.data.jwt)
            }
            resolve(res)
        }).catch(error => {
            localStorage.removeItem('jwt')
            reject(error.response.data.error)
        })
    })

}

// 清空数据
const clear = () => {
    slotData.dataList = []
}

// 重置页数
const reset = () => {
    slotData.pagination.page = 1
    loadData()
}

// 刷新数据
const refresh = () => {
    clear()
    loadData()
}

/**
 * 
 * 其他功能
 */

/**
 * 
 * 生命周期
 */

onBeforeMount(() => {
    if (props.loadtime === loadMode.auto) {
        loadData()
    }
})
watch(props, (val, oldVal) => {
    //开发环境
    if (process.env.NODE_ENV === 'development') {
        console.log('props changed', val, oldVal)
    }
    slotData.pagination = {
        page: props.pageCurrent,
        pageSize: props.pageSize,
        withCount: props.getCount
    }
    if (props.loadtime === loadMode.onready || props.loadtime === loadMode.auto) {
        loadData()
    }
}, {
    deep: true,
    immediate: true
})

/**
 * 
 * 生命周期
 */

/**
 * 
 * 暴露函数
 */

defineExpose({
    loadMore,
    login,
    clear,
    reset,
    refresh,
})


/**
 * 
 * 暴露函数
 */
</script>