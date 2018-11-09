const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');
const btdc = require('bottender-compose');
require('dotenv').config();

const config = require('./bottender.config.js').messenger;

const welcome = require('./func/welcome');
const job = require('./func/job');
const constellation = require('./func/constellation');
const knowledge = require('./func/knowledge');
const realcase = require('./func/case');

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
  verifyToken: config.verifyToken,
});

bot.onEvent(

  btdc.condition([

    // 開始與重新對話
    [btdc.isPayloadMatch('__GET_STARTED__'), welcome],
    [btdc.isPayloadMatch('__RESTART__'), btdc.series([btdc.resetState(), welcome])],

    // 提供工作資訊平台
    [btdc.isPayloadMatch('searchAll'), job],

    // 星座找工作
    [btdc.isPayloadMatch('constellation'), btdc.sendText('請輸入星座', {
      quick_replies: [{
        content_type: 'text',
        title: '查看星座列表',
        payload: 'showAllConstellation',
      },
      ],
    })],
    [btdc.isTextMatch(/(牡|白)羊/), btdc.sendText('凡事爭第一的人生價值，使得他們在個人運動專案和新型的創業中，會得到比較大的職業聲望。但是，大起大落是白羊座，必須小心的職業課題。另外，由於積極追求成就感和面子，各種產品的業務銷售冠軍，常常產生在這星座中。「堅持」是白羊職場成功的關鍵。')],
    [btdc.isTextMatch(/金牛/), btdc.sendText('天生謹慎保守、對工作執著的性格，使他們適合做專案經理、保險基金經理、特別助理、行政會計人員。他們對地產有很好的直覺力，也適合從事房地產開發、仲介經紀等工作。天生有表演欲望和天分的金牛，可從事演藝工作，歌手、造型師、演員、編劇等。')],
    [btdc.isTextMatch(/雙子/), btdc.sendText('反應快、口才好、有數字概念的雙子，雖然是生活白癡，但對從事的行業則有最強的趨勢嗅覺。他們最適合從事行銷策略、活動策劃、主持人、補習班教師、記者等工作。如果有財務知識基礎，可從事期貨商品交易、股票交易員等。要小心投機風險。')],
    [btdc.isTextMatch(/巨蟹/), btdc.sendText('巨蟹座對工作是斤斤計較、一絲不苟。他們最會殺價、價格談判等工作。人力資源、採購、總務人員都是他們可以勝任的工作。如果，團隊讓他覺得有歸屬感，巨蟹座可是會全力以赴，成為老闆的得力助手。巨蟹座也非常適合各種女性、母嬰、家居相關產品的銷售經營，但要小心情緒化問題。')],
    [btdc.isTextMatch(/獅子/), btdc.sendText('很熱心、有責任感、天生的團隊領袖人才，能夠調動各種資源達成業務目標。銷售人員、總經理、政治方面工作都很好。另外，他們不怕大場面，愈大的格局愈有大將之風。也適合各種表演工作或是電影監製。不過要避免大頭症。')],
    [btdc.isTextMatch(/處女/), btdc.sendText('天生的行政人才，可以把事情有條有理的處理好。處女座做助理、行政、教師、會計、交易員，都有邏輯清晰的優勢。完美主義傾向，使處女座擔任採購、彩妝師、髮型師、芳療師、作家、舞蹈家都很勝任。教育方面工作也很適合。要避免太挑剔，而得罪所有人。')],
    [btdc.isTextMatch(/天秤/), btdc.sendText('有天賦的人際談判個性，可以協調別人無法解決的問題。在公關經理、政治家、外交官、銷售人員領域，都可見到天秤座迷人的風采。天秤座對於公平的原則性，使他們做律師、法官、法務人員也很適合。許多長相俊美的天秤座，進入演藝行業。要增強自己的獨特個性魅力。')],
    [btdc.isTextMatch(/天蠍/), btdc.sendText('很有政治嗅覺，懂得在職場建立關係解決問題。適合跨國企業管理、政治界。他們對於神秘學也有興趣天分，觀察力特強，星象師、算命師、心理分析師，都很合適。另外，天蠍座有危機公關能力及身體療癒能力，婦產科醫生、外科醫生、整形醫師很多是天蠍座。要小心愛恨分明樹敵太多敵人。')],
    [btdc.isTextMatch(/(射手|人馬)/), btdc.sendText('看來粗心大意的射手座，內心其實是理想主義、十分高遠。射手座適合做基金會、慈善事業、社會運動。他們興趣很廣，由於工作運勢不錯，各種行業的潛力新星，都可看到射手座的身影。他們也適合高等教育、宗教、跨國企業經營、海外旅遊、媒體、投資、清潔能源相關的事業。要小心得意忘形。 ')],
    [btdc.isTextMatch(/(魔羯|山羊)/), btdc.sendText('很多政治鬥爭下的存活者。他們夠低調、超級務實、會用不停做事來掩飾自己的權力欲望。魔羯座很容易得到大人物的信任，適合長期規劃的建設案、各種私募基金、風險資金、私人銀行工作、家族信託基金。另外，魔羯座作為法官、員警、律師、社會工作人員、公務員、教授的也很多，循規蹈矩的努力執行，讓他們有機會爬到高位。要避免利慾薰心。')],
    [btdc.isTextMatch(/水瓶/), btdc.sendText('無厘頭的創意工作者。他們善於將傳統的事業，變身成為新型商業。點子超多的水瓶適合媒體、廣告、公關活動、網路等行當。如果找到方向，他們中年後會堅持在某個領域成為大師。他們對新科技有莫名的好感，在高科技行業、無線通訊、衛星、太空航行、海外旅行等行業也會見到水瓶的創新軌跡。要小心沒有事業航線焦點。')],
    [btdc.isTextMatch(/雙魚/), btdc.sendText('雙魚座別看他們談戀愛到死去活來，他們對在意的事業可是數一數二。他們個性比較悲觀，認為自己沒有價值，就會很快被取代，所以工作很努力。雙魚總是游離在理想和現實的工作之中，如果能做他們夢想的事業，如演藝、航海、媒體、音樂、演講、寫作，他們會有成倍的回報率。但是有一半的雙魚，在做他們沒興趣的事，驚人的是，他們邊抱怨，還做得很傑出。')],

    // 星座列表
    [btdc.isPayloadMatch('showAllConstellation'), constellation],

    // 測驗題目
    [btdc.isPayloadMatch('test'), btdc.sendText('夢中的妳是一個非常受歡迎的少女偶像歌手！其實妳有一個秘密，就是妳現在正跟一個很紅的小天王在交往當中。不過這種情形對身為偶像的兩人來說，是一件非常計忌諱的事情，所以妳會？', {
      quick_replies: [{
        content_type: 'text',
        title: '退出歌壇，專心與他談戀愛',
        payload: 'goThree',
      },
      {
        content_type: 'text',
        title: '放棄愛情，繼續當偶像',
        payload: 'goTwo',
      },
      ],
    })],
    [btdc.isPayloadMatch('goTwo'), btdc.sendText('場景突然一換，現在的妳是一個參加外交官考試的考生，如果要妳選擇派駐地的話，妳希望到哪個國家去呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '擁有廣闊大地的澳洲',
        payload: 'goFour',
      },
      {
        content_type: 'text',
        title: '充滿藝術與古跡的義大利',
        payload: 'goThree',
      },
      ],
    })],
    [btdc.isPayloadMatch('goThree'), btdc.sendText('這次妳又變成一個廣告公司的文案人員，這次客戶將要推出一種營養飲料，妳會將它命名為什麼呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '活力Ａ他命',
        payload: 'goFour',
      },
      {
        content_type: 'text',
        title: '美麗Ｃ元素',
        payload: 'goFive',
      },
      ],
    })],
    [btdc.isPayloadMatch('goFour'), btdc.sendText('接下來妳變成一個大公司的董事長秘書，雖然董事長對人不太友善，不過卻是相當疼愛妳。這天妳發現到公司裏的其他董事正在商討要如何將董事長拉下臺的邪惡陰謀，知道這個真相的妳，會如何做呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '覺得董事長太可憐，立刻去向他報告',
        payload: 'goSix',
      },
      {
        content_type: 'text',
        title: '反正他那麼凶，不想淌這個渾水',
        payload: 'goFive',
      },
      ],
    })],
    [btdc.isPayloadMatch('goFive'), btdc.sendText('這次妳是一家寵物店的女老闆，一天來了一個很有錢的女人要買一隻寵物，不過她中意的剛好是妳最喜歡的一隻小貓。妳心裏想，可以的話最好不要賣掉。那麼，妳會如何回答她呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '這是非賣品的小貓',
        payload: 'goSeven',
      },
      {
        content_type: 'text',
        title: '請妳一定要好好疼愛牠',
        payload: 'goSix',
      },
      ],
    })],
    [btdc.isPayloadMatch('goSix'), btdc.sendText('接下來妳又變成一個新科立委，一些選民希望妳能在當地興建可以振興觀光業的高爾夫球場，可是這麼一來，卻可能會造成農藥污染。進退兩難的妳，會怎麼辦呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '為了長久的將來打算，拒絕興建高爾夫球場',
        payload: 'goEight',
      },
      {
        content_type: 'text',
        title: '解決經濟才是當務之急，會努力促成球場興建',
        payload: 'goSeven',
      },
      ],
    })],
    [btdc.isPayloadMatch('goSeven'), btdc.sendText('妳變成一位空中小姐，有一天妳所服務的航班剛好有妳最崇拜的藝人登機，這下妳會有什麼反應呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '會對他有特別的禮遇與照顧',
        payload: 'goEight',
      },
      {
        content_type: 'text',
        title: '怕其他乘客會生氣，還是以一般的服務對待他',
        payload: 'goNine',
      },
      ],
    })],
    [btdc.isPayloadMatch('goEight'), btdc.sendText('夢中的妳又搖身一變成為一個新銳大導演，妳覺得自己的第一部電影會選擇什麼樣子的題材呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '浪漫的愛情故事',
        payload: 'goTen',
      },
      {
        content_type: 'text',
        title: '充滿想像的科幻故事',
        payload: 'goNine',
      },
      ],
    })],
    [btdc.isPayloadMatch('goNine'), btdc.sendText('妳成了一位幼稚園老師，這天園裏面的一個小男生跑過來跟妳說「等我長大了要跟老師結婚！」聽到這些話的妳，會如何回答呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '笑著說 好，不過等你長大了，老師就變成老了',
        payload: 'goEleven',
      },
      {
        content_type: 'text',
        title: '輕摸一下對方的頭說「你真是人小鬼大！」',
        payload: 'goTen',
      },
      ],
    })],
    [btdc.isPayloadMatch('goTen'), btdc.sendText('妳變成一位到火星探險的太空人，跟另一位夥伴一起到外太空出任務。對於這次的探險，妳最擔心什麼事呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '想到每天只有不好吃的太空食物，就感到很悶',
        payload: 'goEleven',
      },
      {
        content_type: 'text',
        title: '擔心無法順利回到最愛的地球',
        payload: 'goThirteen',
      },
      ],
    })],
    [btdc.isPayloadMatch('goEleven'), btdc.sendText('一回過神來，妳突然穿著護士的衣服，眼前一個小孩子看到妳手上的針筒，就嚇得嚎啕大哭。那麼，妳會如何替他打針呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '一邊說著「一點都不痛喔～」一邊找機會下手',
        payload: 'goTwelve',
      },
      {
        content_type: 'text',
        title: '跟他說 其他小朋友也沒哭喔，火速地打下去',
        payload: 'goTypeB',
      },
      ],
    })],
    [btdc.isPayloadMatch('goTwelve'), btdc.sendText('妳變成一個很受歡迎的少女漫畫家，今天編輯打電話來詢問妳進度，很少拖稿的妳卻因為陷入低潮，居然連一頁都還沒完成。因此，妳會如何來向對方說明呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '老實跟對方說「我已經盡力了」',
        payload: 'goTypeF',
      },
      {
        content_type: 'text',
        title: '「其實我生病了…」找個藉口搪塞過去',
        payload: 'goThirteen',
      },
      ],
    })],
    [btdc.isPayloadMatch('goThirteen'), btdc.sendText('這次妳是一位花店的老闆娘，有一個很帥的男顧客進來買花，因為他要送給女朋友，所以想請妳給個建議。那麼妳會替他挑選什麼樣的花束呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '純白的玫瑰花束',
        payload: 'goTypeC',
      },
      {
        content_type: 'text',
        title: '有各種顏色的繽紛花束',
        payload: 'goFourteen',
      },
      ],
    })],
    [btdc.isPayloadMatch('goFourteen'), btdc.sendText('夢裏妳又變成一個女警官，這次在妳眼前發生了犯人脫逃事件，妳會採取何種行動呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '立刻跳上車子追捕犯人',
        payload: 'goTypeA',
      },
      {
        content_type: 'text',
        title: '記下犯人的車號，聯絡其他的同事，展開搜捕',
        payload: 'goFifteen',
      },
      ],
    })],
    [btdc.isPayloadMatch('goFifteen'), btdc.sendText('夢裏妳又變成一個女警官，這次在妳眼前發生了犯人脫逃事件，妳會採取何種行動呢？', {
      quick_replies: [{
        content_type: 'text',
        title: '當然是女孩最喜歡的「浪漫約會何處去」之類的介紹',
        payload: 'goTypeE',
      },
      {
        content_type: 'text',
        title: '教大家「如何把平常的服飾穿出流行感」的專題報導',
        payload: 'goTypeD',
      },
      ],
    })],

    // 測驗結果
    [btdc.isPayloadMatch('goTypeA'), btdc.series([
      btdc.sendText('👉外語能力最重要穿梭各國的超級經理人'),
      btdc.sendText('對於這種類型的妳，我們建議妳最好從事可以穿梭世界各地的行業，像是擔任貿易公司的業務經理人或是自行創業當老闆。因為這樣的生活雖然很忙碌，不過卻很適合讓具有商業頭腦的妳發揮長才。對了，既然要當個空中飛人，別忘了要好好充實一下自己的外語能力唷！'),
      btdc.sendImage('https://images.pexels.com/photos/1179804/pexels-photo-1179804.jpeg?auto=compress&cs=tinysrgb&h=350'),
      btdc.sendButtonTemplate('相關職缺參考', [{
        type: 'Web_url',
        title: '助理',
        url: 'https://tw.wanted.jobs/search?query=助理',
      }, {
        type: 'Web_url',
        title: '工程',
        url: 'https://tw.wanted.jobs/search?query=工程',
      }, {
        type: 'Web_url',
        title: '產品規劃',
        url: 'https://tw.wanted.jobs/search?query=產品規劃',
      },
      ]),
    ])],
    [btdc.isPayloadMatch('goTypeB'), btdc.series([
      btdc.sendText('👉最好要有職業證照具有一技之長的專業人員'),
      btdc.sendText('妳適合從事的工作就是具有專門技術的從業人員，像是建築師、工程師等這類需要職業證照的工作。此外與媒體有關的行業，好比說編輯、導播等也很不錯，因為這樣的工作既可跟人群接觸，也擁有獨一無二的專業性。如果妳生性較害羞的話，那麼研究室的研究員也是不錯的選擇。'),
      btdc.sendImage('https://images.pexels.com/photos/908284/pexels-photo-908284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
      btdc.sendButtonTemplate('職缺參考', [{
        type: 'Web_url',
        title: '網路工程師',
        url: 'https://tw.wanted.jobs/search?query=%E7%B6%B2%E8%B7%AF',
      }, {
        type: 'Web_url',
        title: '程式工程師',
        url: 'https://tw.wanted.jobs/search?query=%E7%A8%8B%E5%BC%8F',
      }, {
        type: 'Web_url',
        title: 'UI/UX 設計師',
        url: 'https://tw.wanted.jobs/search?query=UI',
      },
      ]),
    ])],
    [btdc.isPayloadMatch('goTypeC'), btdc.series([
      btdc.sendText('👉正視自己的才能個性化的藝術相關行業'),
      btdc.sendText('這類型的妳最好是從事與自己興趣相關的行業，像是音樂家、畫家、小說家等藝術性頗高的職業都非常適合妳。不要說自己的能力不夠，如果真心喜愛此類事物的話，就從現在開始充實這方面的知識吧！個性十足的妳，唯有在這些領域才能夠大放異彩，所以千萬不要等到老大徒傷悲喔！'),
      btdc.sendImage('https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
      btdc.sendButtonTemplate('職缺參考', [{
        type: 'Web_url',
        title: '編輯',
        url: 'https://tw.wanted.jobs/search?query=%E7%B7%A8%E8%BC%AF',
      }, {
        type: 'Web_url',
        title: '影音',
        url: 'https://tw.wanted.jobs/search?query=%E5%BD%B1%E9%9F%B3',
      },
      ]),
    ])],
    [btdc.isPayloadMatch('goTypeD'), btdc.series([
      btdc.sendText('👉需要細心與耐心非妳莫屬的事務性工作'),
      btdc.sendText('適合妳的工作就是各行各業都不可或缺的事務性人員！雖然此類的工作乍看之下非常普通，不過這卻是需要極大的耐心、細心與責任感，可不是誰都做得來的。妳可以選擇進入大公司的總務部門，或是到公家機關上班都不錯。此外，會計師事務所與設計公司也都是可以考慮的選擇。'),
      btdc.sendImage('https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
      btdc.sendButtonTemplate('職缺參考', [{
        type: 'Web_url',
        title: '行政',
        url: 'https://tw.wanted.jobs/search?query=%E8%A1%8C%E6%94%BF',
      }, {
        type: 'Web_url',
        title: '文書',
        url: 'https://tw.wanted.jobs/search?query=文書',
      },
      ]),
    ])],
    [btdc.isPayloadMatch('goTypeE'), btdc.series([
      btdc.sendText('👉內心充實最重要主控權十足的經營者'),
      btdc.sendText('妳最適合自己開一家小店，像是花店、餐廳等都很不錯。因為妳喜歡可以事必躬親、主控權掌握在自己手裏的感覺，所以開店是再好不過了！當然如果不是自行開業也不要緊，只要可以讓妳感到夠充實、夠有趣的話，再忙碌妳還是會樂在其中的，因為妳並不適合一成不變的工作內容。'),
      btdc.sendImage('https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
    ])],
    [btdc.isPayloadMatch('goTypeF'), btdc.series([
      btdc.sendText('👉展現迷人的笑容能夠服務廣大人群的行業'),
      btdc.sendText('最好從事可以服務廣大人群的行業，像是百貨公司的專櫃小姐、店員、空中小姐、導遊等等都是很適合的工作。因為總是笑容滿面又很會替人著想的妳，若是能在這些業界服務的話，一定可以將妳的優點發揮到淋漓盡致，獲得極大的成就感。而且妳接觸的人越多，就會越有活力喔!'),
      btdc.sendImage('https://images.pexels.com/photos/264554/pexels-photo-264554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
    ])],

    // 求職須知
    [btdc.isPayloadMatch('jobKnowledge'), knowledge],
    [btdc.isTextMatch('求職須知'), knowledge],
    [btdc.isPayloadMatch('moreKnowledge'), realcase],
    [btdc.isTextMatch(/實際.*(案例|新聞)/), realcase],

    // 功能說明
    [btdc.isPayloadMatch('help'), btdc.sendText('求職溫納提供以下幾個功能喔', {
      quick_replies: [{
        content_type: 'text',
        title: '查看職缺平台',
        payload: 'searchAll',
      },
      {
        content_type: 'text',
        title: '查看星座列表',
        payload: 'showAllConstellation',
      },
      {
        content_type: 'text',
        title: '性向測驗',
        payload: 'test',
      },
      {
        content_type: 'text',
        title: '求職須知',
        payload: 'jobKnowledge',
      },
      ],
    })],

    // 處理
    btdc.isTextMatch(/87/, btdc.random(btdc.sendText('請不要這樣說我!! 😡😡😡😡😡😡'), btdc.sendText('尊重友善包容'))),
    btdc.isTextMatch(/(你好|您好|嗨|哈囉|Hi|HI|Hello|HELLO)/, btdc.sendText('歡迎使用求職溫拿')),

  ]),
);

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
