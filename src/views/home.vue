<template>
    <el-row class="container">
    	<el-col :span="24" class="header">
    		<el-col class="logo" :span="10" :class="collapsed?'logo-collapse-width':'logo-width'">
			{{collapsed?'':sysName}}
    		</el-col>
    		<el-col :span="10">
    			<div class="tools" @click="collapse">
    				<i class="fa fa-align-justify"></i>
    			</div>
    		</el-col>
    		<el-col class="userinfo" :span="4">
    			<el-dropdown>
			  <span class="el-dropdown-link userinfo-inner">
			    	<img :src="sysUserAvatar">{{sysUserName}}
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>我的消息</el-dropdown-item>
			    <el-dropdown-item>设置</el-dropdown-item>
			    <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
    		</el-col>
    	</el-col>
    	<el-col :span="24" class="main">
    		<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
    			<!--  导航菜单-->
    			<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  :collapse="collapsed" router unique-opened >
			  <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
			  	<el-submenu :index="index+''" v-if="!item.leaf">
			  		<template  slot="title">
			  			<i :class="item.iconCls"></i>
			      			<span slot="title">{{item.name}}</span>
			  		</template>
			  		<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
			  	</el-submenu>
			  	<el-submenu v-if="item.leaf">
			  		{{item.children[0].name}}
			  	</el-submenu>
			  </template>
			</el-menu>
    		</aside>
    		<section class="content-container">
    			<el-col :span="24"  class="breadcrumb-container">
    				<strong class="title">{{$route.name}}</strong>
    				<el-breadcrumb  separator="/"  class="breadcrumb-inner">
				  <el-breadcrumb-item   v-for="item in $route.matched" >
				  	{{item.name}}
				  </el-breadcrumb-item>
				</el-breadcrumb>
    			</el-col>
    			<el-col :span="24" class="content-wrapper">
    				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
    			</el-col>
    		</section>
    	</el-col>
    </el-row>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      sysName: 'Blackie‘s website',
      collapsed: false,
      sysUserName: '',
      sysUserAvatar: ''
    }
  },
  methods: {
    // 餐单操作
    handleOpen () {
      console.log('handleopen')
    },
    handleClose () {
      console.log('handleclose')
    },
    // 缩放菜单
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    // 退出登录
    logout: function () {
      var _this = this
      this.$confirm('确认退出吗？', '提醒', {
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user')
        _this.$router.push('/login')
      }).catch(() => {})
    }
  },
  mounted () {
    var user = sessionStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      this.sysUserName = user.name || ''
      this.sysUserAvatar = user.avatar || ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('../styles/common.css');
  .page-container{
  	font-size:14px;
  }
  .container{
	 .header{
	    height: 60px;
	    line-height: 60px;
	    background: #20a0ff;
	    color: #fff;
	    .logo {
	    	height:60px;
		font-size: 22px;
		padding-left:20px;
		padding-right:20px;
		border-color: rgba(238,241,146,0.3);
		border-right-width: 1px;
		border-right-style: solid;
	    }
	    .logo-width{
		width:230px;
	    }
	    .logo-collapse-width{
		width:60px
	    }
	    .tools{
	    	padding: 0px 23px;
		width:14px;
		height: 60px;
		line-height: 60px;
		cursor: pointer;
	    }
	    .userinfo{
	    	text-align: right;
		padding-right: 35px;
		float: right;
		.userinfo-inner{
			cursor: pointer;
			color:#fff;
			img{
				width: 40px;
				height: 40px;
				border-radius: 20px;
				margin: 10px 0px 10px 10px;
				float: right;
			}
		}
	    }
	 }
	 .main{
	 	display: flex;
	 	position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		min-height: 500px;
	 	aside {
	 		width:230px;
	 		.el-menu{
				height: 100%;
			}
	 	}
	 	.menu-collapsed{
			flex:0 0 60px;
			width: 60px;
		}
		.menu-expanded{
			flex:0 0 230px;
			width: 230px;
		}
		.content-container {
			flex:1;
			overflow-y: scroll;
			padding: 20px;
			.breadcrumb-container{
				.title{
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner{
					float: right;
				}
			}
			.content-wrapper {
				background-color: #fff;
				box-sizing: border-box;
			}

		}
	 }
  }
</style>