/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import dynamic from 'next/dynamic';
import { Bubble, useMessages } from '@chatui/core';
import { Image } from '@chatui/core';

const Chat = dynamic(() => import('@chatui/core'), { ssr: false });

// console.log(useMessages)

var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = '//g.alicdn.com/chatui/icons/0.3.0/index.js';
document.head.appendChild(script); 

const initialMessages = [
    {
      type: 'text',
      content: { text: '你好，我是智能助理小Q，你的贴心小助手~' },
      user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
    }
  ];

  // 默认快捷短语，可选
const defaultQuickReplies = [
    {
      icon: 'message',
      name: '联系人工服务',
      isNew: true,
      isHighlight: true,
    },
    {
      name: '如何获得返现？',
      isNew: true,
    },
    {
      name: '密码、用户名忘记了，无法登录怎么办？',
      isHighlight: true,
    }
  ];

export default function ChatPage() {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  // 发送回调
  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
        user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
      });

      setTyping(true);

      // 模拟回复消息
      setTimeout(() => {
        if (val == '如何获得返现？' || /.*返现.*/g.test(val)) {
            appendMsg({
          type: 'text',
          content: { text: '1、登录携程\n只有携程会员网上、手机客户端预订酒店、机票才能参与返现活动，所以需要您先登录会员账户。\n2、选择参加返现活动的酒店\n1）在线查找酒店时，选择标有“返”图标的酒店和房型，光标移至“返”图标，可了解返现的使用说明。\n使用途径\n返现账户中的现金可用于兑换礼品卡（任我行、任我游）、兑换成积分、手机话费及转出到储蓄卡。a）返现账户金额累计大于等于1元，可选择按1：105兑换积分、兑换礼品卡（任我行、任我游），不收取手续费。b）返现账户金额累计大于5元，可以进行转账到储蓄卡。小于200元的提现，通过网站操作，收取5元/笔的手续费。通过客户端操作，返现账户金额累计大于等于1元，免收手续费。c）返现账户金额达到50元或100元或200元，可以进行充值手机话费，不收取手续费。2）成功预订并入住，订单成交后3个工作日内您将获得相应返现。1、登录携程 只有携程会员网上、手机客户端预订酒店、机票才能参与返现活动，所以需要您先登录会员账户。新会员需要先注册；如需重置密码，请点这里。2、选择参加返现活动的酒店1）在线查找酒店时，选择标有“返”图标的酒店和房型，光标移至“返”图标，可了解返现的使用说明。' },
          user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
        });
        } else if (val == '密码、用户名忘记了，无法登录怎么办？' || /.*(用户名|密码).*/g.test(val)) {
          appendMsg({
            type: 'text',
            content: { text: '如果您的账户已经和Email或者手机绑定，可以在网站右上方“您好，请登录”界面填写用户名/卡号/绑定手机号/绑定邮箱，然后点击右边的“忘记密码”，根据页面提示操作，在新界面中输入验证码点击“提交”；在新页面中，点击对应的重置按钮，系统会将验证密码或邮件直接发送到绑定手机上或绑定邮箱中；手机验证时，在网页中输入短信里的验证码；邮箱验证时，点击邮件中的确认链接，最终需要您设定新的密码。如以上方式无法获得密码或账户未进行过任何绑定，请直接致电95010转会员中心，由专员为您服务。'},
            user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
          })
        }
      }, 1000);
    }
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  function handleQuickReplyClick(item) {
    handleSend('text', item.name);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <Image src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <div className='chat'>
      <Chat
      navbar={{ title: '智能助理小Q' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
      />
    </div>
    
  );
}