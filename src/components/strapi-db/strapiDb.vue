<template>
    <view>
        <slot :data="slotData.dataList" :pagination="slotData.pagination" :loading="slotData.loading" :hasMore="slotData.hasMore" :error="slotData.errorMessage" />
    </view>
</template>

<script setup>

import { ref, reactive, onBeforeMount } from 'vue'
import axios from 'axios'
import qs from 'qs'


const props = defineProps({
    baseUrl: { // API接口地址
        type: String,
        default: 'https://strapi.marlenej.com/api'
    },
    jwt: { // JWT token,保障用户权限
        type: String,
        default: '',
    },
    collection: { // 表名
        type: [String, Array],
        default: ''
    },
    field: { // 指定要查询的字段
        type: String,
        default: ''
    },
    fliters: { // 查询条件
        type: [String, Object],
        default: ''
    },
    sort: { // 排序字段
        type: String,
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
        default: 20
    },
    getCount: { // 是否查询数据条数 withCount
        type: Boolean,
        default: false
    },
    getOne: { // 是否只查询一条数据
        type: Number,
        default: undefined
    },
    distinct: { // 是否对数据去重
        type: [Boolean, String],
        default: false
    },
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
 * 相关配置chacao
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
    const collection = props.collection
    const getOne = props.getOne

    const query = qs.stringify({
        // filters: {
        //     username: {
        //         $eq: 'John',
        //     },
        // },
    }, {
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
        url += `/${getOne}/${query}`
    } else {
        url += `/${query}`
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
    if (!!res.data) {
        slotData.pagination = res.meta.pagination
        slotData.hasMore = slotData.pagination.page < slotData.pagination.pageCount
    } else {
        slotData.errorMessage = res.error
    }
    slotData.dataList = res.data
    emits(events.load,slotData.dataList,slotData.hasMore,slotData.pagination) // 成功回调，给父组件传递数据
}

// 获取数据失败后的处理函数
const loadDataFail = (err) => {
    slotData.errorMessage = err
    emits(events.error,err) // 失败回调，给父组件传递错误信息
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
 * 生命周期
 */

onBeforeMount(() => {
    loadData()
})


/**
 * 
 * 生命周期
 */
</script>