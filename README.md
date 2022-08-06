
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center" ><strong>StrapiDB</strong></h1>

  <p align="center">
    帮助您专注于前端开发的基于Strapi的前端组件。
    

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
    <a href="https://github.com/MarleneJiang/strapi-db"><strong>浏览组件使用文档 »</strong></a>
    <br />
    <a href="https://github.com/MarleneJiang/strapi-db">View Demo</a>
    ·
    <a href="https://github.com/MarleneJiang/strapi-db/issues">Report Bug</a>
    ·
    <a href="https://github.com/MarleneJiang/strapi-db/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>文档大纲</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## 项目说明


Strapi是一款非常优秀的无头CMS，它基于koa2开发，提供了后端、管理端以及数据库等服务，且支持众多插件扩展。Strapi的出现为我们全栈开发提供了非常大的帮助，让我们不需要费力专注于后端和数据库，而只需将开发中心放在前端，这样我们就可以专注于前端开发。

为此呢，作者秉持了这样敏捷开发的理念，进一步为Strapi与Vue.js交互，即前后端交互，提供更好的开发体验与便利。它的灵感主要来自于[UniCloudDb](https://uniapp.dcloud.net.cn/uniCloud/unicloud-db.html)。

`<strapi-db>`组件是一个专用于Strapi的Restful API查询组件。<br/>
前端通过组件方式直接获取strapi的接口的数据，并绑定在界面上进行渲染。<br/>
在传统开发中，开发者需要在前端定义data、通过request联网获取接口数据、然后赋值给data。同时后端还需要写接口来查库和反馈数据。<br/>
但有了strapi和strapi-db，就不再需要编写增删查改的接口和前端请求代码，这些工作，只需要一行代码。写组件，设组件的属性，在属性中指定要查什么表、哪些字段、以及查询条件，就OK了！<br />
IDE敲下`strapi-db`代码块，得到如下代码，然后通过collection属性指定要查询表“table1”，通过field属性指定要查询字段“field1”的数据。查询结果data就可以直接渲染在界面上。
```html
<strapi-db v-slot:default="{data}" collection="table1" fields="field1">
	<view>
	    <ul>
            <li v-for="item in data">
            {{ item }}
            </li>
        </ul>
	</view>
</strapi-db>

```

`<strapi-db> `组件尤其适用于列表、详情等展示类页面。开发效率可以大幅度的提升。
`<strapi-db>` 组件不仅支持查询。还自带了add、remove、update方法，见下文方法章节。

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



### Built With

组件主要基于无头的`Strapi`和MVVM前端开发框架`Vue.js`。
> 请注意，本组件完全基于Vue3.


[![Vue][Vue.js]][Vue-url]


<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- GETTING STARTED -->
## 使用样例

这是一个简单示例来帮助你更快的掌握组件的使用方法。

### 准备使用

组件的所有功能皆已经存放于`strapiDb.vue`文件中，请将该文件拖拽到您开发的vue3项目的根目录中。

### 安装依赖

组件不可避免地需要提前在项目中安装依赖，我们推荐使用`yarn`来安装依赖

1. axios
   ```sh
    yarn add axios
   ```
2. qs
   ```sh
    yarn add qs
   ```
### 开始使用
在文件中引入该组件，并在template内编写如下代码即可。更详细的例子请参考[preview.vue](https://github.com/MarleneJiang/strapi-db/blob/main/src/components/preview.vue)
``` html
<strapi-db v-slot:default="{data}" collection="table1" fields="field1" baseUrl="http://www.example.com/api">
	<view>
	    <ul>
            <li v-for="item in data">
            {{ item }}
            </li>
        </ul>
	</view>
</strapi-db>
```

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- USAGE EXAMPLES -->
## 组件说明文档

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add 回到顶部 links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/MarleneJiang/strapi-db/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">回到顶部</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/MarleneJiang/strapi-db.svg?style=for-the-badge
[contributors-url]: https://github.com/MarleneJiang/strapi-db/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MarleneJiang/strapi-db.svg?style=for-the-badge
[forks-url]: https://github.com/MarleneJiang/strapi-db/network/members
[stars-shield]: https://img.shields.io/github/stars/MarleneJiang/strapi-db.svg?style=for-the-badge
[stars-url]: https://github.com/MarleneJiang/strapi-db/stargazers
[issues-shield]: https://img.shields.io/github/issues/MarleneJiang/strapi-db.svg?style=for-the-badge
[issues-url]: https://github.com/MarleneJiang/strapi-db/issues
[license-shield]: https://img.shields.io/github/license/MarleneJiang/strapi-db.svg?style=for-the-badge
[license-url]: https://github.com/MarleneJiang/strapi-db/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 