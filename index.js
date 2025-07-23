//keitagamesユーザー管理サービスを作りたい
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});

client.once('ready', async () => {
  console.log(`ログイン成功: ${client.user.tag}`);

  const guild = client.guilds.cache.get(''); // サーバーIDを指定
  if (!guild) return console.log('サーバーが見つかりません');

  const members = await guild.members.fetch(); // 全メンバー取得
  const onlineMembers = members.filter(member => member.presence?.status === 'online');
  const idleMembers = members.filter(member => member.presence?.status === 'idle');
  const dndMembers = members.filter(member => member.presence?.status === 'dnd');

  console.log(`オンラインユーザー数: ${onlineMembers.size}`);
  onlineMembers.forEach(member => {
    console.log(`${member.user.tag} がオンラインです`);
    
  });
    console.log(`アイドルユーザー数: ${idleMembers.size}`); 
    idleMembers.forEach(member => {
    console.log(`${member.user.tag} がアイドルです`);
    });
    console.log(`Do Not Disturbユーザー数: ${dndMembers.size}`);
    dndMembers.forEach(member => {
    console.log(`${member.user.tag} がDo Not Disturbです`);
    });
});

client.login(process.env.TOKEN); // .envファイルにお書きください
