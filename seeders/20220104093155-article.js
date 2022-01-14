'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Articles', [
            {
                title: '武汉最好吃的小吃是什么？',
                content: '当然是热干面、三鲜豆皮',
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                title: '今天的天气可真好呀',
                content: '狂风暴雨特别凉快，欢迎每年来武汉看海！',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Articles', null, {});
    }
};
