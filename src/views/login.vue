<template>
    <el-form ref="form" :rules="formRules" :model="form" class="login-container">
    	<h3 class="title">系统登录</h3>
    	<el-form-item prop="account">
    		<el-input type="text" v-model="form.account" placeholder="账号"></el-input>
    	</el-form-item>
    	<el-form-item>
    		<el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    	</el-form-item>
    	<el-form-item>
    		<el-checkbox checked>记住密码</el-checkbox>
    	</el-form-item>
    	<el-form-item>
		<el-button type="primary" @click="submit" style="width:100%;" :loading="logining">登录</el-button>
    	</el-form-item>
    </el-form>
</template>
<script type="text/javascript">
  import { requestLogin } from '../api/api'
  export default {
    data () {
      return {
        logining: false,
        form: {
          account: '',
          password: ''
        },
        formRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submit (e) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.logining = true
            var postData = {
              username: this.form.account,
              password: this.form.password
            }
            requestLogin(postData).then(
              data => {
                let msg = 'successe'
                let code = 200
                let user = { id: 1, username: 'admin', password: '123456', avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png', name: '张某某' }
                if (code !== 200) {
                  this.$message({
                    message: msg,
                    type: 'error'
                  })
                } else {
                  sessionStorage.setItem('user', JSON.stringify(user))
                  this.$router.push({ path: '/table' })
                }
              }
            )
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-container{
	width:350px;
	margin:180px auto;
	border:1px solid  #eaeaea;
	 -webkit-border-radius: 5px;
    	border-radius: 5px;
    	-moz-border-radius: 5px;
    	box-shadow: 0 0 25px #cac6c6;
    	padding: 35px 35px 15px 35px;
    	.title{
    		text-align:center;
    	}
}
</style>