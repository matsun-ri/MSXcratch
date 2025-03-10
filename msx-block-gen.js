/**********************************************************************
    Blocklyを使ってMSX BASICのコードを作る
    ・ボタンイベントの処理
**********************************************************************/

//ブロックIFのジャンプ先 生成用
var LabelCount = 0;

//コードエリアのクイック保存・読込のためのキー
const BrowserSaveKey = 'MSXBlocklyStorage';

//ツールボックスの定義
var toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "テキスト",
      "colour": "rgb(82, 151, 250)",
      "contents": [
        { "kind": "block", "type": "msx_locate" },
        { "kind": "block", "type": "msx_print" },
        { "kind": "block", "type": "msx_width" },
        { "kind": "block", "type": "msx_key_view" }
      ]
    },
    {
      "kind": "category",
      "name": "画面",
      "colour": "rgb(104, 136, 236)",
      "contents": [
        { "kind": "block", "type": "msx_cls" },
        { "kind": "block", "type": "msx_color" },
        { "kind": "block", "type": "msx_palette" },
        { "kind": "block", "type": "msx_screen" },
        { "kind": "block", "type": "msx_vpoke" }
      ]
    },
    {
      "kind": "category",
      "name": "グラフィックス",
      "colour": "rgb(127, 120, 222)",
      "contents": [
        { "kind": "block", "type": "msx_setpage_visible" },
        { "kind": "block", "type": "msx_setpage_drawable" },
        { "kind": "block", "type": "msx_line" },
        { "kind": "block", "type": "msx_box" },
        { "kind": "block", "type": "msx_circle" },
        { "kind": "block", "type": "msx_pset" },
        { "kind": "block", "type": "msx_paint" },
        { "kind": "block", "type": "msx_copy" },
        { "kind": "block", "type": "msx_copyx" }
      ]
    },
    {
      "kind": "category",
      "name": "スプライト",
      "colour": "rgb(149, 105, 209)",
      "contents": [
        { "kind": "block", "type": "msx_sprite_size" },
        { "kind": "block", "type": "msx_put_sprite" },
        { "kind": "block", "type": "msx_sprite_pattern_8x8" },
        { "kind": "block", "type": "msx_sprite_pattern_16x16" }
      ]
    },
    {
      "kind": "category",
      "name": "音",
      "colour": "rgb(222, 103, 184)",
      "contents": [
        { "kind": "block", "type": "msx_play" },
        { "kind": "block", "type": "msx_sound" },
        { "kind": "block", "type": "msx_beep" }
      ]
    },
    {
      "kind": "category",
      "name": "制御",
      "colour": "rgb(251, 173, 56)",
      "contents": [
        { "kind": "block", "type": "msx_main" },
        { "kind": "block", "type": "msx_rem" },
        { "kind": "block", "type": "msx_eval" },
        { "kind": "block", "type": "msx_for" },
        { "kind": "block", "type": "msx_loop" },
        { "kind": "block", "type": "msx_while" },
        { "kind": "block", "type": "msx_if_then" },
        { "kind": "block", "type": "msx_if_else" },
        { "kind": "block", "type": "msx_try_catch" },
        { "kind": "block", "type": "msx_end" },
        { "kind": "block", "type": "msx_run2file" }
      ]
    },
    {
      "kind": "category",
      "name": "ブロック定義",
//      "colour": "rgb(248, 108, 130)", //本来のブロック定義の色
      "colour": "rgb(250, 140,  93)",
      "contents": [
        { "kind": "block", "type": "msx_subprocedure" },
        { "kind": "block", "type": "msx_call_subproc" },
        { "kind": "block", "type": "msx_on_interval" },
        { "kind": "block", "type": "msx_on_interval_set" },
        { "kind": "block", "type": "msx_on_interval_enable" },
        { "kind": "block", "type": "msx_on_sprite" },
        { "kind": "block", "type": "msx_on_sprite_enable" },
        { "kind": "block", "type": "msx_on_strig" },
        { "kind": "block", "type": "msx_on_strig_enable" }
      ]
    },
    {
      "kind": "category",
      "name": "調べる",
      "colour": "rgb(191, 196,  7)", //調べる
      "contents": [
        { "kind": "block", "type": "msx_input" },
        { "kind": "block", "type": "msx_lineinput" },
        { "kind": "block", "type": "msx_inkey" },
        { "kind": "block", "type": "msx_inputdollar" },
        { "kind": "block", "type": "msx_stick" },
        { "kind": "block", "type": "msx_strig" },
        { "kind": "block", "type": "msx_random" },
        { "kind": "block", "type": "msx_time" },
        { "kind": "block", "type": "msx_time_reset" }
      ]
    },
    {
      "kind": "category",
      "name": "変数",
      "colour": "rgb(146, 193,  52)", //変数
//      "colour": "rgb(101, 190,  97)", //演算
//      "colour": "rgb( 56, 187, 142)", //拡張機能
      "contents": [
        { "kind": "block", "type": "msx_deftype" },
        { "kind": "block", "type": "msx_dim" },
        { "kind": "block", "type": "msx_let" },
        { "kind": "block", "type": "msx_let_f" }
      ]
    },
    {
      "kind": "category",
      "name": "実験",
      "colour": "rgb(96, 96, 96)",
      "contents": [
        { "kind": "block", "type": "add_exclamation" },
        { "kind": "block", "type": "print_text" },
        { "kind": "block", "type": "text_field_block" }
      ]
    }
  ]
};

//Blocklyワークスペースを上で確保した場所に入れる
var workspace = Blockly.inject('blocklyDiv',
    {
      //ここにBlocklyの各種設定を書く
//            toolbox: document.getElementById('toolbox'),
      toolbox: toolbox,
      zoom:  //ズーム方法
        {
          controls: true,    //ズーム有効
          wheel: false,     //マウスホイール
          startScale: 0.7,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,  //ピンチ操作有効
          pinch: true
        },
      renderer: 'Zelos',    //見た目をScratch3風に
      move:  //スクロール方法
        {
          scrollbars: 
          {
            horizontal: true,
            vertical: true  
          },
          drag: true,
          wheel: true}          
        }
  );

// 初期ブロック「RUNされたとき」を配置
var startBlock = workspace.newBlock('msx_main');
startBlock.initSvg();
startBlock.render();
startBlock.moveBy(50, 50); // 位置調整


/******************************************
    MSX BASICコードの生成
******************************************/
function makeCode(){

  const labelMap = {}; // ラベルの位置を保存
  
  //ブロックからプログラム（文字列）を作成
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  
  //取得したプログラムを行ごとに分割
  var linesOrigin = code.split(/\r?\n/);
  
  //メイン処理部の開始目印の個数をカウント
  const startCount = linesOrigin.filter(line => line === MSX_main_start).length;
  if (startCount !== 1) {
    const errMsg = `エラー: ブロック「RUNされたとき」は1つだけ必要です（${startCount}個あります）`;
    alert( errMsg );
    throw new Error( errMsg );
  }
  
  const startIndex = linesOrigin.indexOf( MSX_main_start );
  const endIndex = linesOrigin.indexOf( MSX_main_end );
  
  // メイン処理部の開始目印から終了目印までを抽出
  const startEndPart = linesOrigin.slice(startIndex, endIndex + 1);
  // 残りの部分を抽出
  const remainingLines = linesOrigin.slice(0, startIndex).concat(linesOrigin.slice(endIndex + 1));
  // メイン処理部を先頭に入れ替え
  var lines = startEndPart.concat(remainingLines).join('\n').split(/\r?\n/);;
  
  //最終行の空白を削除する
  //(ブロックの塊ごとに空白行が付加されるっぽい)
  if( lines.length > 0 && lines[lines.length - 1].trim() === "" ) lines.pop();
  
  LabelCount = 0;
  
  //全行の加工 1パス目
  //・空行にアポストロフィ
  //・ラベルを見つけたら行番号とともに覚えておく
  //  ラベル（ジャンプ先）の仕様 "__else:nn__" "__endif:nn__" など
  //  ラベル（ジャンプ元）の仕様 "__else-nn__" "__endif-nn__" など
  // 使用ブロック
  // ・～の間は繰り返す __while:nn__, endwhile-nn__
  // ・もし～なら __endif:nn__, __endif-nn__
  // ・もし～なら～でなければ __else：nn__, __endif:nn__, __else-nn__, __endif-nn__, 
  // ・エラートラップ __errcatch:nn__,__enderr:nn__,__errcatch-nn__,__enderr-nn__ 
  // ・スプライト衝突割り込み __onsprite:1__,__onsprite-1__ 
  // ・スペースキー割り込み __onstrig:1__,__onstrig-1__ 
  // ・サブルーチン __subproc:"LABEL"__
  //  
  for( i=0; i<lines.length; i++){
    
    //空行はとりあえずアポストロフィをつける（MSXに貼り付けたときにUndefined line numberになるので）
    if( lines[i].trim() === "" ) lines[i]="'";
    
    //ジャンプ先ラベルはあるか？ /=開始と終了 (else|endif)="else"or"endif" \d=1桁の数値 +=その繰り返し 他は固定の文字列
    const match = lines[i].match(/__(else|endif|while|endwhile|errcatch|enderr|onstrig|onsprite|oninterval):\d+__/);
    if( match ){
      //ラベルを__..-nn__に変換し、キーとして行番号を保存
      const newStr = match[0].replace(/__(else|endif|while|endwhile|errcatch|enderr|onstrig|onsprite|oninterval):(\d+)__/, (match, keyword, number) => { return `__${keyword}-${number}__`; });
      labelMap[newStr] = (i + 1) * 10;
      
      //発見したラベルを削除
      lines[i] = lines[i].replace( ' '+match[0], '' );
    }
    
    //GOSUB用ラベルのみチェック 例:__subproc:"ルーチン名"__
    const matchGosub = lines[i].match(/__subproc:"([^"]+)"__/);
    if( matchGosub ){
      
      //ラベルを__subproc-"ルーチン名"__に変換し、キーとして行番号を保存
      const newStr = matchGosub[0].replace(/__subproc:"([^"]+)"__/, (matchGosub, label) => { return `__subproc-"${label}"__`; });
      labelMap[newStr] = (i + 1) * 10;
      
      //発見したラベルを削除
      lines[i] = lines[i].replace( ' ' + matchGosub[0], '' );
    }
  }
  
  //全行の加工 2パス目
  for( i=0; i<lines.length; i++){
    
    //ジャンプ元ラベルはあるか？
    const match = lines[i].match(/__(else|endif|while|endwhile|errcatch|enderr|onstrig|onsprite|oninterval)-\d+__/);
    if( match ){
      //ラベルを覚えておく
      labelStr = match[0];
      
      var linenumber = '** not found **';
      
      //連想配列のキーは存在する？
      if( labelMap.hasOwnProperty(labelStr) ){
        linenumber = labelMap[labelStr]
      }

      //発見したラベルを行番号に置換
      lines[i] = lines[i].replace( labelStr, linenumber );
    }
    
    //GOSUB用ラベルのみチェック 例:__subproc-"ルーチン名"__
    const matchGosub = lines[i].match(/__subproc-"([^"]+)"__/);
    if( matchGosub ){
      //ラベルを覚えておく
      labelStr = matchGosub[0];
console.log( matchGosub[0]+'→'+labelMap[labelStr] );
      //ラベルが存在するかチェック（ユーザが設定するのでタイポがありえる）
      if ( labelStr in labelMap ) {
        //発見したラベルを行番号に置換
        lines[i] = lines[i].replace( labelStr, ''+labelMap[labelStr] );
      }else{
        const newStr = labelStr.replace(/__subproc-"([^"]+)"__/, (matchGosub, label) => { return label; });
        console.log('サブルーチン「' + newStr + '」が見つかりません');
        lines[i] = lines[i].replace( labelStr, newStr + ' ** not found **' );
      }
    }
    //行番号をつける
    lines[i] = (i+1) * 10 + ' ' + lines[i];
  }
  
  lines.push('');
  
  // ソースコードをテキストボックスに出力
  let msxCodeArea = document.getElementById('msxCodeArea');
  msxCodeArea.value = lines.join('\n');
  
}

/******************************************
    生成したMSX BASICのコードを
    クリップボードにコピー
******************************************/
function copy2clipboard()
{
  // navigator.clipboard API を利用（HTTPS環境で動作します）
  navigator.clipboard.writeText(msxCodeArea.value)
    .then(() => {
      alert("クリップボードにコピーしました。");
    })
    .catch(err => {
      console.error("コピーに失敗しました: ", err);
      alert("コピーに失敗しました。");
    });
}

/******************************************
    ワークスペースのクイック保存
******************************************/
function saveCodeArea() {
  if (!'localStorage' in window) return;
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var text = Blockly.Xml.domToText(xml);
  window.localStorage.setItem(BrowserSaveKey, text);
}

/******************************************
    ワークスペースのクイック読込
******************************************/
function loadCodeArea() {
  var xml = Blockly.utils.xml.textToDom(window.localStorage[BrowserSaveKey]);
  workspace.clear(); // 既存ブロックを全削除
  Blockly.Xml.domToWorkspace(xml, workspace);
}

/******************************************
    ワークスペースをファイルに保存 by Grok 3
******************************************/
function saveWorkspace() {
  // ワークスペースの状態をJSONにシリアライズ
  var state = Blockly.serialization.workspaces.save(workspace);
  var jsonText = JSON.stringify(state, null, 2); // 読みやすい形式に

  // ファイルをダウンロード
  var blob = new Blob([jsonText], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  
  link.href = url;
  link.download = "blockly_workspace.json"; // ファイル名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/******************************************
    ワークスペースをファイルから読込 by Grok 3
******************************************/
function loadWorkspace(event) {
  var file = event.target.files[0];
  if (!file) return;
  
  var reader = new FileReader();
  reader.onload = function(e) {
    var jsonText = e.target.result;
    var state = JSON.parse(jsonText);
    workspace.clear(); // 既存ブロックを全削除
    // ワークスペースに状態を復元
    Blockly.serialization.workspaces.load(state, workspace);
  };
  reader.readAsText(file);
}


