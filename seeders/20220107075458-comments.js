'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Comments', [
            {
                articleId: 1,
                content: '这是文章1的评论',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                articleId: 1,
                content: '这还是文章1的评论',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                articleId: 2,
                content: '这是文章2的评论',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Comments', null, {});
    }
};
