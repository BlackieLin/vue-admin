<template>
    <section>
    	<!-- 工具条 -->
    	<el-col :span="24" class="toolbar">
    		<el-form :inline="true" :model="filters">
    			<el-form-item>
    				<el-input :model="filters.name" type="text" placeholder="姓名"></el-input>
    			</el-form-item>
    			<el-form-item>
    				<el-button type="primary" @click="getUsers">查询</el-button>
    			</el-form-item>
    			<el-form-item>
    				<el-button type="primary" @click="handleAdd">新增</el-button>
    			</el-form-item>
    		</el-form>
    	</el-col>
    	<!--列表-->
    	<el-table :data="users"  v-loading="listLoading"  style="width: 100%;">
    		<el-table-column type="selection" width="55">
		</el-table-column>
		<el-table-column type="index" label="序号"  width="80">
		</el-table-column>
		<el-table-column prop="name" label="姓名" width="120" sortable>
		</el-table-column>	
		<el-table-column prop="addr" label="地址" min-width="180" sortable>
		</el-table-column>
		<el-table-column label="操作" >
			<template scope="scope">
				<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				<el-button type="danger" size="small">删除</el-button>
			</template>
		</el-table-column>
    	</el-table>
    	<!--编辑界面-->
    	<el-dialog v-model="editFormVisible">
    		<el-form :model="editForm" :rules="editFormRules" ref="editForm">
    			<el-form-item label="姓名" prop="name">
    				<el-input v-model="editForm.name"  auto-complete="off"></el-input>
    			</el-form-item>
    			<el-form-item label="地址">
    				<el-input v-model="editForm.addr"  auto-complete="off"></el-input>
    			</el-form-item>
    			<el-form-item>
    				<el-button @click="editFormVisible=false">取消</el-button>
    				<el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
    			</el-form-item>
    		</el-form>
    	</el-dialog>
    </section>
</template>
<script type="text/javascript">
import { getUserListPage } from '../../api/api'
export default {
  data () {
    return {
      filters: {
        name: ''
      },
      total: 0,
      page: 1,
      listLoading: false,
      users: [],
      editFormVisible: false,
      editForm: {
        id: 0,
        name: '',
        addr: ''
      },
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getUsers: function () {
      let para = {
        page: this.page,
        name: this.filters.name
      }
      this.listLoading = true
      getUserListPage(para).then((res) => {
        this.total = res.data.total
        this.users = res.data.users
        this.listLoading = false
      })
    },
    handleAdd: function () {
      console.log('handleAdd')
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 编辑保存
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
          })
        }
      })
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
<style lang="scss" scoped>

</style>