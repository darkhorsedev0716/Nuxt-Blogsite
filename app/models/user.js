const moment = require('moment');
const bcrypt = require('bcryptjs')
const { sequelize } = require('@core/db')
const { Sequelize, Model } = require('sequelize')

// 定义用户模型
class User extends Model {

}

// 初始用户模型
User.init({
    id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        // 备注
        comment: '用户昵称'
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: 'user_email_unique',
        comment: '登录邮箱'
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            // 加密
            const salt = bcrypt.genSaltSync(10);
            // 生成加密密码
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue("password", psw);
        },
        allowNull: false,
        comment: '登录密码'
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
})


module.exports = {
    User
}
