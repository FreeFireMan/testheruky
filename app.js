const Telegraf = require('telegraf');
const session = require('telegraf/session');

let token = '1006075112:AAFGjaFlDEFcOkgNmlJN4CIohcANkv-dqD8';

const bot = new Telegraf(token);
bot.use(session());

const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const {leave} = Stage;

// Greeter scene
const greeter = new Scene('greeter');

greeter.enter((ctx) => {
    if (ctx.update.message.chat.type === 'private') {
        ctx.session.groups = [];
        let keyboard = [
            [
                {
                    text: 4,
                    callback_data: JSON.stringify({
                        id: -336786315,
                        // title: 'Group testArnold_group4',
                        whatDo: 'sendMsg'
                    })
                },
                {
                    text: 5,
                    callback_data: JSON.stringify({
                        id: -349392634,
                        // title: 'Group testArnold_group5',
                        whatDo: 'sendMsg'
                    })
                },
                {
                    text: 6,
                    callback_data: JSON.stringify({
                        id: -366162673,
                        // title: 'Group testArnold_group6',
                        whatDo: 'sendMsg'
                    })
                },
                {
                    text: 7,
                    callback_data: JSON.stringify({
                        id: -351770350,
                        // title: 'Group testArnold_group7',
                        whatDo: 'sendMsg'
                    })
                },
                {
                    text: 8,
                    callback_data: JSON.stringify({
                        id: -383842034,
                        // title: 'Group testArnold_group8',
                        whatDo: 'sendMsg'
                    })
                },
            ],
        ];
        ctx.reply('Hi, select groups for send message', {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});

greeter.leave((ctx) => {
    ctx.reply('Message sended')
});

// greeter.hears(/hi/gi, leave());
greeter.on('message', async (ctx) => {
    let chatId = ctx.message.chat.id;
    let messageId = ctx.message.message_id;
    for (let i = 0; i < ctx.session.groups.length; i++) {
        bot.telegram.forwardMessage(ctx.session.groups[i], chatId, messageId);
    }

    console.log('dva');
    ctx.scene.leave();
    console.log('3333');
});

greeter.on('callback_query', (ctx) => {
    let cb = ctx.callbackQuery.data;
    let parseData = JSON.parse(cb);
    if (parseData.whatDo === 'sendMsg') {
        ctx.session.groups.push(parseData.id);
    }
    console.log(ctx.session.groups);
});

// Create scene manager
const stage = new Stage();
stage.command('cancel', leave());

// Scene registration
stage.register(greeter);

bot.use(stage.middleware());
bot.command('send', (ctx) => {
    ctx.scene.enter('greeter');
});


// bot.command('test', async (ctx) => {
//     if (ctx.update.message.chat.type === 'private') {
//         ctx.session.groups = [];
//         let keyboard = [
//             [
//                 {
//                     text: 4,
//                     callback_data: JSON.stringify({
//                         id: -336786315,
//                         // title: 'Group testArnold_group4',
//                         whatDo: 'sendMsg'
//                     })
//                 },
//                 {
//                     text: 5,
//                     callback_data: JSON.stringify({
//                         id: -349392634,
//                         // title: 'Group testArnold_group5',
//                         whatDo: 'sendMsg'
//                     })
//                 },
//                 {
//                     text: 6,
//                     callback_data: JSON.stringify({
//                         id: -366162673,
//                         // title: 'Group testArnold_group6',
//                         whatDo: 'sendMsg'
//                     })
//                 },
//                 {
//                     text: 7,
//                     callback_data: JSON.stringify({
//                         id: -351770350,
//                         // title: 'Group testArnold_group7',
//                         whatDo: 'sendMsg'
//                     })
//                 },
//                 {
//                     text: 8,
//                     callback_data: JSON.stringify({
//                         id: -383842034,
//                         // title: 'Group testArnold_group8',
//                         whatDo: 'sendMsg'
//                     })
//                 },
//             ],
//             [
//                 {
//                     text: 'Send',
//                     callback_data: 'my-callback-data'
//                 }
//             ]
//         ];
//
//         await ctx.reply('Select chat for send message', {
//             reply_markup: {
//                 inline_keyboard: keyboard
//             }
//         });
//
//
//     }
// });
//
// bot.action("my-callback-data", (ctx, next) => {
//     ctx.reply('Send message');
//     bot.on("message", (ctx1, next1) => {
//         let chatId = ctx1.message.chat.id;
//         let messageId = ctx1.message.message_id;
//         console.log(chatId);
//         console.log(messageId);
//         console.log('msg');
//         bot.telegram.forwardMessage(chatId, chatId, messageId);
//     }).middleware();
// });
//
// // let chatId = ctx.message.chat.id;
// // let messageId = ctx.message.message_id;
// // for (let i = 0; i < ctx.session.groups.length; i++) {
// //     bot.telegram.forwardMessage(ctx.session.groups[i], chatId, messageId);
// // }
//
// bot.on("callback_query", (ctx) => {
//     let cb = ctx.callbackQuery.data;
//     let parseData = JSON.parse(cb);
//
//     if (parseData.whatDo === 'sendMsg') {
//         ctx.session.groups.push(parseData.id);
//     }
//
//     console.log(ctx.session.groups);
//
// });

bot.launch().then(value => {
    console.log('Bot is started...');
});