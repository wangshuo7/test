<template>
  <div class="login-container">
    <div class="form-warp">
      <h2 class="header">后台管理系统</h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="adminname">
          <el-input
            placeholder="输入用户名"
            v-model="ruleForm.adminname"
            type="password"
            autocomplete="off"
          >
            <!-- input插槽 User -->
            <template #prefix>
              <el-icon color="#409EFC" class="no-inherit">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="输入密码"
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          >
            <!-- input插槽 Lock -->
            <template #prefix>
              <el-icon color="#409EFC" class="no-inherit">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// 引入icon
import { User, Lock } from '@element-plus/icons-vue'
import { mapMutations } from 'vuex'
import { login } from '../api/user'
export default defineComponent({
  data() {
    return {
      ruleFormRef: null,
      ruleForm: {
        adminname: '',
        password: ''
      },
      rules: {
        adminname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  components: {
    User,
    Lock
  },
  mounted() {
    this.ruleFormRef = this.$refs.ruleFormRef // 组件挂载完毕的时候，this.ruleFormRef = form 表单组件
  },
  methodes: {
    ...mapMutations(['updateUserInfo']),
    submitForm(ruleFormRef) {
      if (!ruleFormRef) return
      ruleFormRef.validate((valid) => {
        if (valid) {
          console.log('submit!')
          login({
            adminname: this.ruleForm.adminname,
            password: this.ruleForm.password
          }).then((res) => {
            // 1.登录成功后，需要保存用户信息
            // 2.如果用户登录了，不能重复登录
            // 3.编程式导航跳转到home首页
            console.log('res--->', res)
            // 使用mapStation
            this.updateUserInfo(res.data)
            this.$router.push({ name: 'home' })
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background: #2b3c4d;

  .form-warp {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .header {
      color: #fff;
      text-align: center;
      margin-bottom: 32px;
    }
  }

  .el-form {
    background: #fff;
    width: 320px;
    padding: 32px 32px 20px 32px;
    border-radius: 10px;

    .el-button {
      width: 100%;
      margin-top: 24px;
    }
  }
}
</style>
