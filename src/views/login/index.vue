<template>
    <div class="login">
        <div class="login-mask"></div>
        <div class="login-logo">
            <span>LOGO</span>
        </div>
        <div class="login-content">
            <div class="login-content-main">
                <h4 class="login-content-main-title">后台模板</h4>
                <transition name="el-zoom-in-center">
                    <el-form class="login-content-form">
                        <el-form-item>
                            <el-input
                                type="text"
                                placeholder="请输入用户名"
                                prefix-icon="el-icon-user"
                                v-model="ruleForm.userName"
                                clearable
                                autocomplete="off"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-input
                                type="password"
                                placeholder="请输入密码"
                                prefix-icon="el-icon-lock"
                                v-model="ruleForm.password"
                                autocomplete="off"
                                show-password
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                class="login-content-submit"
                                @click="onSignIn"
                                :loading="loading.signIn"
                                >登录</el-button
                            >
                        </el-form-item>
                    </el-form>
                </transition>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useStore } from '/@/store/index.ts';
export default defineComponent({
    name: 'Login',
    setup() {
        const store = useStore();
        const state = reactive({
            ruleForm: {
                userName: 'admin',
                password: '123456',
            },
            loading: {
                signIn: false,
            },
        });

        // 登录
        const onSignIn = () => {
            // state.loading.signIn = true;
            store.dispatch('user/login', {
                userName: state.ruleForm.userName,
                password: state.ruleForm.password,
            });
        };

        return {
            onSignIn,
            ...toRefs(state),
        };
    },
});
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    background: url('../../assets/login/login-bg.png') no-repeat;
    background-size: 100% 100%;

    &-mask {
        width: 100%;
        height: 100%;
        background: url('../../assets/login/login-in.png') no-repeat;
        background-size: 100% 100%;
    }

    &-logo {
        position: absolute;
        top: 30px;
        left: 50%;
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 20px;
        color: var(--color-primary);
        letter-spacing: 2px;
        width: 90%;
        transform: translateX(-50%);
    }

    &-content {
        width: 500px;
        padding: 20px;
        position: absolute;
        top: 30%;
        left: 60%;
        box-shadow: 0 2px 12px 0 var(--color-primary-light-5);
        border-radius: 4px;
        transition: height 0.2s linear;
        height: 350px;
        overflow: hidden;
        z-index: 1;
        background: #fff;
        &-main {
            margin: 0 auto;
            width: 80%;

            &-title {
                color: #333;
                font-weight: 500;
                font-size: 24px;
                text-align: center;
                letter-spacing: 2px;
                margin: 15px 0 30px;
                white-space: nowrap;
            }
        }

        .login-content-form {
            margin-top: 20px;
            .login-content-submit {
                width: 100%;
                letter-spacing: 2px;
                font-weight: 300;
                margin-top: 15px;
                height: 50px;
            }
        }
    }
}
</style>
