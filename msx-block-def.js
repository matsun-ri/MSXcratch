/**********************************************************************
    Blocklyを使ってMSX BASICのコードを作る
    ・ブロックの形状の定義
    ・MSX BASICのコードを要求されたときの処理
**********************************************************************/

// ローカル環境ではimportは機能しないので削除
//import * as Blockly from 'blockly/core';
//import {javascriptGenerator, Order} from 'blockly/javascript';

//メイン処理部の開始目印
const MSX_main_start = "'__main_start__";
//メイン処理部の終了目印
const MSX_main_end =   "'__main_end__";

console.log( 'Blockly.VERSION: ', Blockly.VERSION );

/**********************************************************************
    ブロックの形状の定義
**********************************************************************/

Blockly.defineBlocksWithJsonArray(
  [
/******************************************
    カテゴリ：テキスト
******************************************/
    {
      "type": "msx_locate",
      "tooltip": "LOCATE x,y",
      "message0": "カーソル位置 %1 , %2",
      "args0": [
        {
        "type": "field_input",
        "name": "num_x",
        "text": "15"
        },
        {
        "type": "field_input",
        "name": "num_y",
        "text": "11"
        },
      ],
      "previousStatement": null,
      "nextStatement": null,
      //  "inputsInline": true,
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_print",
      "tooltip": "PRINT",
      "message0": "%1 と言う",
      "args0": [
        {
        "type": "field_input",
        "name": "str_text",
        "text": '"Hello,world."'
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_width",
      "tooltip": "WIDTH",
      "message0": "●画面の桁数 %1", //WIDTH
      "args0": [
      {
        "type": "field_input",
        "name": "num_width",
        "text": "32"
      }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_key_view",
      "tooltip": "KEY ON/OFF",
      "message0": "ファンクションキーの表示を %1 にする",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "str_key_view",
          "options": [
            ["ON", "ON"],
            ["OFF", "OFF"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：画面
******************************************/
    {
      "type": "msx_cls",
      "tooltip": "CLS",
      "message0": "すべてを消す",
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(104, 136, 236)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_color",
      "tooltip": "COLOR n,n,n",
      "message0": "文字色%1 背景色%2 周辺色%3",
      "args0": [
        {
          "type": "field_input",
          "name": "num_fore",
          "text": "15"
        },
        {
          "type": "field_input",
          "name": "num_back",
          "text": "4"
        },
        {
          "type": "field_input",
          "name": "num_surr",
          "text": "7"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(104, 136, 236)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_palette",
      "tooltip": "COLOR=(c,r,g,b)",
      "message0": "パレット %1 番に赤 %2 緑 %3 青 %4 を設定する",
      "args0": [
        {
          "type": "field_input",
          "name": "num_paletteno",
          "text": "15"
        },
        {
          "type": "field_input",
          "name": "num_r",
          "text": "7"
        },
        {
          "type": "field_input",
          "name": "num_g",
          "text": "7"
        },
        {
          "type": "field_input",
          "name": "num_b",
          "text": "7"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(104, 136, 236)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_screen",
      "tooltip": "SCREEN n",
      "message0": "画面モード %1",
      "args0": [
        {
          "type": "field_input",
          "name": "num_screen_no",
          "text": "1"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(104, 136, 236)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_vpoke",
      "tooltip": "VPOKE",
      "message0": "VRAMのアドレス %1 に %2 を書き込む",
      "args0": [
        {
          "type": "field_input",
          "name": "num_addr",
          "text": "&H0000"
        },
        {
          "type": "field_input",
          "name": "num_data",
          "text": "&H00"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(104, 136, 236)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：グラフィックス
******************************************/
    {
      "type": "msx_setpage_visible",
      "tooltip": "SET PAGE n",
      "message0": "表示対象 %1 ページ目",
      "args0": [
        {
          "type": "field_input",
          "name": "num_page",
          "text": "0"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_setpage_drawable",
      "tooltip": "SET PAGE ,n",
      "message0": "描画対象 %1 ページ目",
      "args0": [
        {
          "type": "field_input",
          "name": "num_page",
          "text": "0"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_line",
      "tooltip": "LINE",
      "message0": "線を引く 座標 %1 , %2 から%3 , %4 まで 色 %5 論理演算 %6",
      "args0": [
        {
          "type": "field_input",
          "name": "num_x1",
          "text": "20"
        },
        {
          "type": "field_input",
          "name": "num_y1",
          "text": "10"
        },
        {
          "type": "field_input",
          "name": "num_x2",
          "text": "70"
        },
        {
          "type": "field_input",
          "name": "num_y2",
          "text": "50"
        },
        {
          "type": "field_input",
          "name": "num_c",
          "text": "13"
        },
        {
          "type": "field_dropdown",
          "name": "str_logi_op",
          "options": [
            ["PSET", "PSET"],
            ["PRESET", "PRESET"],
            ["XOR", "XOR"],
            ["OR", "OR"],
            ["AND", "AND"],
            ["TPSET", "TPSET"],
            ["TPRESET", "TPRESET"],
            ["TXOR", "TXOR"],
            ["TOR", "TOR"],
            ["TAND", "TAND"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_box",
      "tooltip": "LINE ,B/BF",
      "message0": "枠を描く 座標 %1 , %2 から%3 , %4 まで 色 %5 塗りつぶし %6 論理演算 %7",
      "args0": [
        {
          "type": "field_input",
          "name": "num_x1",
          "text": "20"
        },
        {
          "type": "field_input",
          "name": "num_y1",
          "text": "10"
        },
        {
          "type": "field_input",
          "name": "num_x2",
          "text": "70"
        },
        {
          "type": "field_input",
          "name": "num_y2",
          "text": "50"
        },
        {
          "type": "field_input",
          "name": "num_c",
          "text": "13"
        },
        {
          "type": "field_dropdown",
          "name": "str_is_fill",
          "options": [
            ["する", "YES"],
            ["しない", "NO"]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "str_logi_op",
          "options": [
            ["PSET", "PSET"],
            ["PRESET", "PRESET"],
            ["XOR", "XOR"],
            ["OR", "OR"],
            ["AND", "AND"],
            ["TPSET", "TPSET"],
            ["TPRESET", "TPRESET"],
            ["TXOR", "TXOR"],
            ["TOR", "TOR"],
            ["TAND", "TAND"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_circle",
      "tooltip": "CIRCLE",
      "message0": "円を描く 座標 %1 , %2 半径 %3 色 %4",
      "args0": [
        {
          "type": "field_input",
          "name": "num_x",
          "text": "127"
        },
        {
          "type": "field_input",
          "name": "num_y",
          "text": "95"
        },
        {
          "type": "field_input",
          "name": "num_r",
          "text": "80"
        },
        {
          "type": "field_input",
          "name": "num_c",
          "text": "15"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_pset",
      "tooltip": "PSET",
      "message0": "点を描く 座標 %1 , %2 色 %3  論理演算 %4",
      "args0": [
        {
          "type": "field_input",
          "name": "num_x",
          "text": "127"
        },
        {
          "type": "field_input",
          "name": "num_y",
          "text": "95"
        },
        {
          "type": "field_input",
          "name": "num_c",
          "text": "15"
        },
        {
          "type": "field_dropdown",
          "name": "str_logi_op",
          "options": [
            ["PSET", "PSET"],
            ["PRESET", "PRESET"],
            ["XOR", "XOR"],
            ["OR", "OR"],
            ["AND", "AND"],
            ["TPSET", "TPSET"],
            ["TPRESET", "TPRESET"],
            ["TXOR", "TXOR"],
            ["TOR", "TOR"],
            ["TAND", "TAND"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_paint",
      "tooltip": "PAINT",
      "message0": "塗りつぶす 座標 %1 , %2 塗りつぶし色 %3 境界色 %4",
      "args0": [
        {
          "type": "field_input",
          "name": "num_x",
          "text": "127"
        },
        {
          "type": "field_input",
          "name": "num_y",
          "text": "95"
        },
        {
          "type": "field_input",
          "name": "num_paint_color",
          "text": "15"
        },
        {
          "type": "field_input",
          "name": "num_border_Color",
          "text": "15"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_copy",
      "tooltip": "COPY",
      "message0": "画像コピー %1 , %2 から%3 , %4 までの範囲を %5 %6 , %7 へ %8",
      "args0": [
        {
          "type": "field_input",
          "name": "num_sx1",
          "text": "20"
        },
        {
          "type": "field_input",
          "name": "num_sy1",
          "text": "10"
        },
        {
          "type": "field_input",
          "name": "num_sx2",
          "text": "70"
        },
        {
          "type": "field_input",
          "name": "num_sy2",
          "text": "50"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "field_input",
          "name": "num_dx1",
          "text": "20"
        },
        {
          "type": "field_input",
          "name": "num_dy1",
          "text": "10"
        },
        {
          "type": "input_dummy",
          "name": "NAME",
          "align": "RIGHT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_copyx",
      "tooltip": "COPY",
      "message0": "画像コピー ページ %1 の %2 , %3 から%4 , %5 までの範囲を %6 ページ %7 の %8 , %9 へ 論理演算 %10 %11",
      "args0": [
        {
          "type": "field_input",
          "name": "num_src_page",
          "text": "0"
        },
        {
          "type": "field_input",
          "name": "num_sx1",
          "text": "20"
        },
        {
          "type": "field_input",
          "name": "num_sy1",
          "text": "10"
        },
        {
          "type": "field_input",
          "name": "num_sx2",
          "text": "70"
        },
        {
          "type": "field_input",
          "name": "num_sy2",
          "text": "50"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "field_input",
          "name": "num_dest_page",
          "text": "1"
        },
        {
          "type": "field_input",
          "name": "dx1",
          "text": "20"
        },
        {
          "type": "field_input",
          "name": "dy1",
          "text": "10"
        },
        {
          "type": "field_dropdown",
          "name": "str_logi_op",
          "options": [
            ["PSET", "PSET"],
            ["PRESET", "PRESET"],
            ["XOR", "XOR"],
            ["OR", "OR"],
            ["AND", "AND"],
            ["TPSET", "TPSET"],
            ["TPRESET", "TPRESET"],
            ["TXOR", "TXOR"],
            ["TOR", "TOR"],
            ["TAND", "TAND"]
          ]
        },
        {
          "type": "input_dummy",
          "name": "NAME",
          "align": "RIGHT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：スプライト
******************************************/
    {
      "type": "msx_sprite_size",
      "tooltip": "SCREEN ,n",
      "message0": "スプライトモード %1",  //SCREENの第2引数
      "args0": [
        {
          "type": "field_input",
          "name": "num_sprite_size",
          "text": "1"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(149, 105, 209)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_put_sprite",
      "tooltip": "PUT SPRITE",
      "message0": "スプライト表示 優先度%1 座標%2 , %3 %4 色番号 %5 パターン番号 %6 %7",
      "args0": [
        {
          "type": "field_input",
          "name": "num_priority",
          "text": "0"
        },
        {
          "type": "field_input",
          "name": "num_x",
          "text": "127"
        },
        {
          "type": "field_input",
          "name": "num_y",
          "text": "96"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "field_input",
          "name": "num_color",
          "text": "15"
        },
        {
          "type": "field_input",
          "name": "num_pattern",
          "text": "0"
        },
        {
          "type": "input_dummy",
          "name": "NAME",
          "align": "RIGHT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(149, 105, 209)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_sprite_pattern_8x8",
      "tooltip": "SPRITE$(n)",
      "message0": "スプライトパターン(8x8) %1番 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31 %32 %33 %34 %35 %36 %37 %38 %39 %40 %41 %42 %43 %44 %45 %46 %47 %48 %49 %50 %51 %52 %53 %54 %55 %56 %57 %58 %59 %60 %61 %62 %63 %64 %65 %66 %67 %68 %69 %70 %71 %72 %73 %74",
      "args0": [
        {
          "type": "field_input",
          "name": "num_pattern_no",
          "text": "0"
        },
        { "type": "input_dummy", "name": "NAME" },
        { "type": "field_checkbox", "name": "arg00", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg10", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg20", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg30", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg40", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg50", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg60", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg70", "checked": "FALSE" },
        { "type": "input_dummy", "name": "NAME" },
        { "type": "field_checkbox", "name": "arg01", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg11", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg21", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg31", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg41", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg51", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg61", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg71", "checked": "FALSE" },
        { "type": "input_dummy", "name": "NAME" },
        { "type": "field_checkbox", "name": "arg02", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg12", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg22", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg32", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg42", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg52", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg62", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg72", "checked": "FALSE" },
        { "type": "input_dummy", "name": "NAME" },
        { "type": "field_checkbox", "name": "arg03", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg13", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg23", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg33", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg43", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg53", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg63", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg73", "checked": "FALSE" },
        { "type": "input_dummy", "name": "NAME" },
        { "type": "field_checkbox", "name": "arg04", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg14", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg24", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg34", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg44", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg54", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg64", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg74", "checked": "FALSE" },
        { "type": "input_dummy", "name": "NAME" },
        { "type": "field_checkbox", "name": "arg05", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg15", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg25", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg35", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg45", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg55", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg65", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg75", "checked": "FALSE" },
        { "type": "input_dummy", "name": "NAME" },
        { "type": "field_checkbox", "name": "arg06", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg16", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg26", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg36", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg46", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg56", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg66", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg76", "checked": "FALSE" },
        { "type": "input_dummy", "name": "NAME" },
        { "type": "field_checkbox", "name": "arg07", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg17", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg27", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg37", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg47", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg57", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg67", "checked": "FALSE" },
        { "type": "field_checkbox", "name": "arg77", "checked": "FALSE" },
        { "type": "input_dummy", "name": "NAME" }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(149, 105, 209)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_sprite_pattern_16x16",
      "tooltip": "SPRITE$(n)",
      "message0": "スプライトパターン(16x16) %1番 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31 %32 %33 %34 %35 %36 %37 %38 %39 %40 %41 %42 %43 %44 %45 %46 %47 %48 %49 %50 %51 %52 %53 %54 %55 %56 %57 %58 %59 %60 %61 %62 %63 %64 %65 %66 %67 %68 %69 %70 %71 %72 %73 %74 %75 %76 %77 %78 %79 %80 %81 %82 %83 %84 %85 %86 %87 %88 %89 %90 %91 %92 %93 %94 %95 %96 %97 %98 %99 %100 %101 %102 %103 %104 %105 %106 %107 %108 %109 %110 %111 %112 %113 %114 %115 %116 %117 %118 %119 %120 %121 %122 %123 %124 %125 %126 %127 %128 %129 %130 %131 %132 %133 %134 %135 %136 %137 %138 %139 %140 %141 %142 %143 %144 %145 %146 %147 %148 %149 %150 %151 %152 %153 %154 %155 %156 %157 %158 %159 %160 %161 %162 %163 %164 %165 %166 %167 %168 %169 %170 %171 %172 %173 %174 %175 %176 %177 %178 %179 %180 %181 %182 %183 %184 %185 %186 %187 %188 %189 %190 %191 %192 %193 %194 %195 %196 %197 %198 %199 %200 %201 %202 %203 %204 %205 %206 %207 %208 %209 %210 %211 %212 %213 %214 %215 %216 %217 %218 %219 %220 %221 %222 %223 %224 %225 %226 %227 %228 %229 %230 %231 %232 %233 %234 %235 %236 %237 %238 %239 %240 %241 %242 %243 %244 %245 %246 %247 %248 %249 %250 %251 %252 %253 %254 %255 %256 %257 %258 %259 %260 %261 %262 %263 %264 %265 %266 %267 %268 %269 %270 %271 %272 %273 %274",
      "args0": [
        {
        "type": "field_input",
        "name": "num_pattern_no",
        "text": "0"
        },
        {
        "type": "input_dummy",
        "name": "NAME"
        },
      { "type": "field_checkbox", "name": "arg00", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg10", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg20", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg30", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg40", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg50", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg60", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg70", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg80", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg90", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga0", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb0", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc0", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd0", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge0", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf0", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg01", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg11", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg21", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg31", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg41", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg51", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg61", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg71", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg81", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg91", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga1", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb1", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc1", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd1", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge1", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf1", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg02", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg12", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg22", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg32", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg42", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg52", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg62", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg72", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg82", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg92", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga2", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb2", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc2", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd2", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge2", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf2", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg03", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg13", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg23", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg33", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg43", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg53", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg63", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg73", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg83", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg93", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga3", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb3", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc3", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd3", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge3", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf3", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg04", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg14", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg24", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg34", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg44", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg54", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg64", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg74", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg84", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg94", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga4", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb4", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc4", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd4", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge4", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf4", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg05", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg15", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg25", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg35", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg45", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg55", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg65", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg75", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg85", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg95", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga5", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb5", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc5", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd5", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge5", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf5", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg06", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg16", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg26", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg36", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg46", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg56", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg66", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg76", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg86", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg96", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga6", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb6", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc6", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd6", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge6", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf6", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg07", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg17", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg27", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg37", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg47", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg57", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg67", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg77", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg87", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg97", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga7", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb7", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc7", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd7", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge7", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf7", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg08", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg18", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg28", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg38", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg48", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg58", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg68", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg78", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg88", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg98", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga8", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb8", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc8", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd8", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge8", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf8", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg09", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg19", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg29", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg39", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg49", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg59", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg69", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg79", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg89", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg99", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arga9", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argb9", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argc9", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argd9", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arge9", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argf9", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg0a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg1a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg2a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg3a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg4a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg5a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg6a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg7a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg8a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg9a", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argaa", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argba", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argca", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argda", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argea", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argfa", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg0b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg1b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg2b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg3b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg4b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg5b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg6b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg7b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg8b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg9b", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argab", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argbb", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argcb", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argdb", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argeb", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argfb", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg0c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg1c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg2c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg3c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg4c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg5c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg6c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg7c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg8c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg9c", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argac", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argbc", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argcc", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argdc", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argec", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argfc", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg0d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg1d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg2d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg3d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg4d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg5d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg6d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg7d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg8d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg9d", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argad", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argbd", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argcd", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argdd", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arged", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argfd", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg0e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg1e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg2e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg3e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg4e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg5e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg6e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg7e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg8e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg9e", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argae", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argbe", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argce", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argde", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argee", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argfe", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" },
      { "type": "field_checkbox", "name": "arg0f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg1f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg2f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg3f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg4f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg5f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg6f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg7f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg8f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "arg9f", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argaf", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argbf", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argcf", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argdf", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argef", "checked": "FALSE" },
      { "type": "field_checkbox", "name": "argff", "checked": "FALSE" },
      { "type": "input_dummy", "name": "NAME" }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(149, 105, 209)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：音
******************************************/
    {
      "type": "msx_play",
      "tooltip": "PLAY",
      "message0": "●演奏 %1 ch.A %2 %3 ch.B %4 %5 ch.C %6 %7",
      "args0": [
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "field_input",
          "name": "str_mml_a",
          "text": '"C"'
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "field_input",
          "name": "str_mml_b",
          "text": '"E"'
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "field_input",
          "name": "str_mml_c",
          "text": '"G"'
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(222, 103, 184)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_sound",
      "tooltip": "SOUND",
      "message0": "PSGのレジスタ %1 番に %2 を書き込む",
      "args0": [
        {
        "type": "field_input",
        "name": "num_channel",
        "text": "8"
        },
        {
        "type": "field_input",
        "name": "num_param",
        "text": "15"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(222, 103, 184)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_beep",
      "tooltip": "BEEP",
      "message0": "ビープ音",
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
      "colour": "rgb(222, 103, 184)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：制御
******************************************/
    {
      "type": "msx_main",
      "tooltip": "メイン処理 他言語のmain()相当",
      "message0": "RUNされたとき %1 %2 END %3",
      "args0": [
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_do"
        },
        {
          "type": "input_dummy",
          "name": "NAME",
          "align": "RIGHT"
        }
      ],
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_rem",
      "tooltip": "REM",
      "message0": "注釈 %1",
      "args0": [
        {
          "type": "field_input",
          "name": "str_comment",
          "text": "コメント"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_eval",
      "tooltip": "書いたそのままをコードとして出力します",
      "message0": "即値 %1",
      "args0": [
        {
          "type": "field_input",
          "name": "str_do",
          "text": "CALL TURBO ON"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_for",
      "tooltip": "FOR...NEXT",
      "message0": "変数 %1 を %2 から %3 まで %4 刻みで繰り返す %5 %6 ⤴ %7",
      "args0": [
        {
          "type": "field_input",
          "name": "str_varable",
          "text": "i"
        },
        {
          "type": "field_input",
          "name": "num_start",
          "text": "1"
        },
        {
          "type": "field_input",
          "name": "num_dest",
          "text": "10"
        },
        {
          "type": "field_input",
          "name": "num_step",
          "text": "1"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_do"
        },
        {
          "type": "input_dummy",
          "name": "NAME",
          "align": "RIGHT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_loop",
      "tooltip": "無限ループ",
      "message0": "ずっと %1 %2 ⤴ %3",
      "args0": [
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
            "type": "input_statement",
            "name": "statement_do"
        },
        {
          "type": "input_dummy",
          "name": "NAME",
          "align": "RIGHT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_while",
      "tooltip": "while",
      "message0": "%1の間は繰り返す %2 %3 ⤴ %4",
      "args0": [
        {
          "type": "field_input",
          "name": "num_condition",
          "text": "a=1"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_do"
        },
        {
          "type": "input_dummy",
          "name": "NAME",
          "align": "RIGHT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_if_then",
      "tooltip": "IF...THEN",
      "message0": "もし %1 なら %2 %3",
      "args0": [
        {
          "type": "field_input",
          "name": "num_condition",
          "text": "a=1"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_then"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_if_else",
      "tooltip": "IF...THEN...ELSE",
      "message0": "もし %1 なら %2 %3 でなければ %4 %5",
      "args0": [
        {
          "type": "field_input",
          "name": "num_condition",
          "text": "a=1"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
            "type": "input_statement",
            "name": "statement_then"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_else"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_try_catch",
      "tooltip": "ON ERROR GOTO...RESUME",
      "message0": "●エラートラップ %1 %2 エラー処理 %3 %4",
      "args0": [
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_try"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_catch"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_end",
      "tooltip": "END",
      "helpUrl": "",
      "message0": "このスクリプトを止める",
      "previousStatement": null,
      "inputsInline": true,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_run2file",
      "tooltip": 'RUN"filename"',
      "message0": "プログラム %1 に実行を引き継ぐ",
      "args0": [
        {
          "type": "field_input",
          "name": "str_filename",
          "text": '"filename.bas"'
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(251, 173, 56)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：ブロック定義
******************************************/
    {
      "type": "msx_subprocedure",
      "tooltip": "GOSUB...RETURN",
      "message0": "サブルーチン %1 %2 %3",
      "args0": [
        {
          "type": "field_input",
          "name": "str_proc_name",
          "text": "ルーチン名"
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_sub"
        }
      ],
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_call_subproc",
      "tooltip": "GOSUB",
      "message0": "サブルーチン %1 を呼び出す",
      "args0": [
        {
          "type": "field_input",
          "name": "str_proc_name",
          "text": "ルーチン名"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_on_interval",
      "tooltip": "ON INTERVAL=n GOSUB",
      "message0": "タイマ割り込みが発生したとき %1 %2",
      "args0": [
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_sub"
        }
      ],
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_on_interval_set",
      "tooltip": "ON INTERVAL=n GOSUB",
      "message0": "タイマ割り込みの間隔を %1 /60秒に設定する",
      "args0": [
        {
          "type": "field_input",
          "name": "num_interval",
          "text": "60"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_on_interval_enable",
      "tooltip": "ON INTERVAL=n GOSUB",
      "message0": "タイマ割り込みを %1 する",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "str_mode",
          "options": [
            ["許可", "ON"],
            ["禁止", "OFF"],
            ["保留", "STOP"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_on_sprite",
      "tooltip": "ON SPRITE GOSUB",
      "message0": "スプライトが衝突したとき %1 %2",
      "args0": [
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_sub"
        }
      ],
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_on_sprite_enable",
      "tooltip": "SPRITE ON/OFF/STOP",
      "message0": "スプライト衝突割り込みを %1 する",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "str_mode",
          "options": [
            ["許可", "ON"],
            ["禁止", "OFF"],
            ["保留", "STOP"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_on_strig",
      "tooltip": "ON STRIG GOSUB",
      "message0": "スペースキーが押されたとき %1 %2",
      "args0": [
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_statement",
          "name": "statement_sub"
        }
      ],
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_on_strig_enable",
      "tooltip": "STRIG(0) ON/OFF/STOP",
      "message0": "スペースキー割り込みを %1 する",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "str_mode",
          "options": [
            ["許可", "ON"],
            ["禁止", "OFF"],
            ["保留", "STOP"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(250, 140,  93)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：調べる
******************************************/
    {
      "type": "msx_input",
      "tooltip": "INPUT",
      "message0": "%1 ？と聞いた結果を変数 %2 に入れる",
      "args0": [
        {
          "type": "field_input",
          "name": "str_prompt",
          "text": '""'
        },
        {
          "type": "field_input",
          "name": "str_result",
          "text": "a$"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_lineinput",
      "tooltip": "LINE INPUT",
      "message0": "%1 と聞いた結果を変数 %2 に入れる",
      "args0": [
        {
          "type": "field_input",
          "name": "str_prompt",
          "text": '""'
        },
        {
          "type": "field_input",
          "name": "str_result",
          "text": "a$"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_inkey",
      "tooltip": "INKEY$",
      "message0": "押されているキー",
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_inputdollar",
      "tooltip": "INPUT$()",
      "message0": "%1 文字分押された結果",
      "args0": [
        {
          "type": "field_input",
          "name": "num_chrs",
          "text": "1"
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_stick",
      "tooltip": "STICK(n)",
      "message0": "ジョイスティック %1 番の方向",
      "args0": [
        {
          "type": "field_input",
          "name": "num_stick",
          "text": "0"
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_strig",
      "tooltip": "STRIG(n)",
      "message0": "トリガー %1 番の状態",
      "args0": [
        {
          "type": "field_input",
          "name": "num_strig",
          "text": "0"
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_random",
      "tooltip": "RND",
      "message0": "%1 から %2 までの乱数",
      "args0": [
        {
          "type": "field_input",
          "name": "num_min",
          "text": "1"
        },
        {
          "type": "field_input",
          "name": "num_max",
          "text": "6"
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_time",
      "tooltip": "TIME",
      "message0": "タイマー",
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_time_reset",
      "tooltip": "TIME=0",
      "message0": "タイマーをリセット",
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：変数
******************************************/
    {
      "type": "msx_deftype",
      "tooltip": "DENINT/SNG/DBL",
      "message0": "すべての変数を %1 と宣言する",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "str_deftype",
          "options": [
            ["整数型", "INT"],
            ["単精度実数型", "SNG"],
            ["倍精度実数型", "DBL"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_dim",
      "tooltip": "DIM",
      "message0": "配列変数 %1 を定義する",
      "args0": [
        {
          "type": "field_input",
          "name": "str_var_array",
          "text": "a(5,5)"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_let",
      "tooltip": "LET",
      "message0": "変数 %1 = %2",
      "args0": [
        {
          "type": "field_input",
          "name": "str_let_arg0",
          "text": "a"
        },
        {
          "type": "field_input",
          "name": "str_let_arg1",
          "text": "0"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_let_f",
      "tooltip": "LET",
      "message0": "変数 %1 = 関数 %2",
      "args0": [
        {
          "type": "field_input",
          "name": "str_let_arg0",
          "text": "a"
        },
        {
          "type": "input_value",
          "name": "str_let_arg1"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：実験
******************************************/
    //Geminiによる関数のサンプル
    {
      "type": "add_exclamation",
      "tooltip": "入力された文字列の末尾に「！」を付加します。",
      "message0": "%1 に「！」を付加",
      "args0": [
        {
          "type": "field_input",
          "name": "TEXT",
          "value": "abcdefg"
        }
      ],
      "output": "String",
      "colour": "rgb(96, 96, 96)",
      "helpUrl": ""
    }
    ,
    //文字列を返すブロックを受け入れるブロック Geminiが書いた
    {
      "type": "print_text",
      "tooltip": "入力されたテキストを表示します。",
      "message0": "テキストを表示 %1",
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        }
      ],
      "inputs": {
        "TEXT": {
          "block": {
            "type": "text_field_block"
          }
        }
      },
      "previousStatement": null,
      "nextStatement": null,
      "colour": "rgb(96, 96, 96)",
      "helpUrl": ""
    }
  ]
);

// まずtext_field_blockを定義
Blockly.Blocks['text_field_block'] = {
  init: function() {
    this.jsonInit({
      "type": "text_field_block",
      "message0": "%1",
      "args0": [
        {
          "type": "field_input",
          "name": "TEXT",
          "text": "デフォルト値"
        }
      ],
      "output": "String",
      "colour": "rgb(96, 96, 96)"
    });
  }
};



/**********************************************************************
    MSX BASICのコードを要求されたときの処理
**********************************************************************/

/*
  ローカルだとimportができない対策
  ・javascriptGeneratorの前に javascript.
  ・function()の引数に block, generator
  ・さいごに ;

  Blockly.JavaScript['...']で始まる記法は古いBlocklyのもの（ネットに多い）
  現在のバージョンではこうなる↓
  javascript.javascriptGenerator.forBlock['...']...
  ＊ おおむねBlockly.JavaScript を javascript.javascriptGeneratorに変えると動く
*/

/******************************************
    カテゴリ：テキスト
******************************************/

// LOCATE
javascript.javascriptGenerator.forBlock['msx_locate'] = function(block, generator) {

  const num_x = block.getFieldValue('num_x');
  const num_y = block.getFieldValue('num_y');
  
  const code = `LOCATE ${num_x},${num_y}\n`;

  return code;
};

// PRINT
javascript.javascriptGenerator.forBlock['msx_print'] = function(block, generator) {

  const str_text = block.getFieldValue('str_text');
  
  const code = `PRINT ${str_text}\n`;

  return code;
};

// WIDTH
javascript.javascriptGenerator.forBlock['msx_width'] = function(block, generator) {

  const num_width = block.getFieldValue('num_width');
  
  const code = 'WIDTH ' + num_width + '\n';

  return code;
};
  
// KEY ON/OFF
javascript.javascriptGenerator.forBlock['msx_key_view'] = function(block, generator)  {

  const str_key_view = block.getFieldValue('str_key_view');

  const code = 'KEY ' + str_key_view + '\n';

  return code;
};

/******************************************
    カテゴリ：画面
******************************************/

// CLS
javascript.javascriptGenerator.forBlock['msx_cls'] = function(block, generator)  {

  const code = 'CLS\n';
  return code;
};

// COLOR f,b,s
javascript.javascriptGenerator.forBlock['msx_color'] = function(block, generator) {

  const num_fore = block.getFieldValue('num_fore');
  const num_back = block.getFieldValue('num_back');
  const num_surr = block.getFieldValue('num_surr');
  
  const code = `COLOR ${num_fore},${num_back},${num_surr}\n`;

  return code;
};

//COLOR=(c,r,g,b)
javascript.javascriptGenerator.forBlock['msx_palette'] = function(block, generator) {

  const num_paletteno = block.getFieldValue('num_paletteno');
  const num_r = block.getFieldValue('num_r');
  const num_g = block.getFieldValue('num_g');
  const num_b = block.getFieldValue('num_b');
  
  const code = `COLOR=(${num_paletteno},${num_r},${num_g},${num_b})\n`;

  return code;
};

// SCREEN
javascript.javascriptGenerator.forBlock['msx_screen'] = function(block, generator) {

  const num_screen_no = block.getFieldValue('num_screen_no');

  const code = 'SCREEN ' + num_screen_no + '\n';

  return code;
};

// VPOKE
javascript.javascriptGenerator.forBlock['msx_vpoke'] = function(block, generator) {

  const num_addr = block.getFieldValue('num_addr');
  const num_data = block.getFieldValue('num_data');
  
  const code = `VPOKE ${num_addr},${num_data}\n`;

  return code;
};

/******************************************
    カテゴリ：グラフィックス
******************************************/

// SET PAGE n
javascript.javascriptGenerator.forBlock['msx_setpage_visible'] = function(block, generator) {

  const num_page = block.getFieldValue('num_page');
  
  const code = 'SET PAGE ' + num_page + '\n';
  return code;
};

// SET PAGE ,n
javascript.javascriptGenerator.forBlock['msx_setpage_drawable'] = function(block, generator) {

  const num_page = block.getFieldValue('num_page');
  
  const code = 'SET PAGE ,' + num_page + '\n';
  return code;
};

// LINE
javascript.javascriptGenerator.forBlock['msx_line'] = function(block, generator) {

  const num_x1 = block.getFieldValue('num_x1');
  const num_y1 = block.getFieldValue('num_y1');
  const num_x2 = block.getFieldValue('num_x2');
  const num_y2 = block.getFieldValue('num_y2');
  const num_c = block.getFieldValue('num_c');
  const str_logi_op = block.getFieldValue('str_logi_op');

  const code = `LINE (${num_x1},${num_y1})-(${num_x2},${num_y2}),${num_c},${str_logi_op}\n`;

  return code;
};

// LINE ,B/BF
javascript.javascriptGenerator.forBlock['msx_box'] = function(block, generator) {

  const num_x1 = block.getFieldValue('num_x1');
  const num_y1 = block.getFieldValue('num_y1');
  const num_x2 = block.getFieldValue('num_x2');
  const num_y2 = block.getFieldValue('num_y2');
  const num_c = block.getFieldValue('num_c');
  const str_is_fill = block.getFieldValue('str_is_fill');
  const str_logi_op = block.getFieldValue('str_logi_op');
  
  var code = `LINE (${num_x1},${num_y1})-(${num_x2},${num_y2}),${num_c},B`;

  if( str_is_fill === 'YES' ){
    var code = code + 'F';
  }

  var code = code + `,${str_logi_op}\n`;

  return code;
};

// CIRCLE
javascript.javascriptGenerator.forBlock['msx_circle'] = function(block, generator) {

  const num_x = block.getFieldValue('num_x');
  const num_y = block.getFieldValue('num_y');
  const num_r = block.getFieldValue('num_r');
  const num_c = block.getFieldValue('num_c');
  
  const code = `CIRCLE (${num_x},${num_y}),${num_r},${num_c}\n`;

  return code;
};

// PSET
javascript.javascriptGenerator.forBlock['msx_pset'] = function(block, generator) {

  const num_x = block.getFieldValue('num_x');
  const num_y = block.getFieldValue('num_y');
  const num_c = block.getFieldValue('num_c');
  const str_logi_op = block.getFieldValue('str_logi_op');
  
  const code = `PSET(${num_x},${num_y}),${num_c},${str_logi_op}\n`;

  return code;
};

// PAINT
javascript.javascriptGenerator.forBlock['msx_paint'] = function(block, generator) {

  const num_x = block.getFieldValue('num_x');
  const num_y = block.getFieldValue('num_y');
  const num_paint_color = block.getFieldValue('num_paint_color');
  const num_border_Color = block.getFieldValue('num_border_Color');
  
  const code = `PAINT(${num_x},${num_y}),${num_paint_color},${num_border_Color}\n`;

  return code;
};

// COPY(ページ指定・論理演算なし)
javascript.javascriptGenerator.forBlock['msx_copy'] = function(block, generator) {

  const num_sx1 = block.getFieldValue('num_sx1');
  const num_sy1 = block.getFieldValue('num_sy1');
  const num_sx2 = block.getFieldValue('num_sx2');
  const num_sy2 = block.getFieldValue('num_sy2');
  const num_dx1 = block.getFieldValue('num_dx1');
  const num_dy1 = block.getFieldValue('num_dy1');
  
  const code = `COPY(${num_sx1},${num_sy1})-(${num_sx2},${num_sy2}) TO (${num_dx1},${num_dy1})\n`;

  return code;
};

// COPY(ページ指定・論理演算あり)
javascript.javascriptGenerator.forBlock['msx_copyx'] = function(block, generator) {

  const num_src_page  = block.getFieldValue('num_src_page');
  const num_sx1 = block.getFieldValue('num_sx1');
  const num_sy1 = block.getFieldValue('num_sy1');
  const num_sx2 = block.getFieldValue('num_sx2');
  const num_sy2 = block.getFieldValue('num_sy2');
  const num_dest_page  = block.getFieldValue('num_dest_page');
  const num_dx1 = block.getFieldValue('num_dx1');
  const num_dy1 = block.getFieldValue('num_dy1');
  const str_logi_op = block.getFieldValue('str_logi_op');
  
  const code = `COPY(${num_sx1},${num_sy1})-(${num_sx2},${num_sy2}),${num_src_page} TO (${num_dx1},${num_dy1}),${num_dest_page},${str_logi_op}\n`;

  return code;
};

/******************************************
    カテゴリ：スプライト
******************************************/

// SCREEN ,n
javascript.javascriptGenerator.forBlock['msx_sprite_size'] = function(block, generator) {

  const num_sprite_size = block.getFieldValue('num_sprite_size');
  
  const code = 'SCREEN ,' + num_sprite_size + '\n';

  return code;
};

// PUT SPRITE
javascript.javascriptGenerator.forBlock['msx_put_sprite'] = function(block, generator) {

  const num_priority = block.getFieldValue('num_priority');
  const num_x = block.getFieldValue('num_x');
  const num_y = block.getFieldValue('num_y');
  const num_color = block.getFieldValue('num_color');
  const num_pattern = block.getFieldValue('num_pattern');
  
  const code = `PUT SPRITE ${num_priority},(${num_x},${num_y}),${num_color},${num_pattern}\n`;

  return code;
};

// SPRITE$() 8x8
javascript.javascriptGenerator.forBlock['msx_sprite_pattern_8x8'] = function(block, generator) {

  const num_pattern_no = block.getFieldValue('num_pattern_no');

  const checkbox_arg00 = block.getFieldValue('arg00');
  const checkbox_arg10 = block.getFieldValue('arg10');
  const checkbox_arg20 = block.getFieldValue('arg20');
  const checkbox_arg30 = block.getFieldValue('arg30');
  const checkbox_arg40 = block.getFieldValue('arg40');
  const checkbox_arg50 = block.getFieldValue('arg50');
  const checkbox_arg60 = block.getFieldValue('arg60');
  const checkbox_arg70 = block.getFieldValue('arg70');
  
  const checkbox_arg01 = block.getFieldValue('arg01');
  const checkbox_arg11 = block.getFieldValue('arg11');
  const checkbox_arg21 = block.getFieldValue('arg21');
  const checkbox_arg31 = block.getFieldValue('arg31');
  const checkbox_arg41 = block.getFieldValue('arg41');
  const checkbox_arg51 = block.getFieldValue('arg51');
  const checkbox_arg61 = block.getFieldValue('arg61');
  const checkbox_arg71 = block.getFieldValue('arg71');
  
  const checkbox_arg02 = block.getFieldValue('arg02');
  const checkbox_arg12 = block.getFieldValue('arg12');
  const checkbox_arg22 = block.getFieldValue('arg22');
  const checkbox_arg32 = block.getFieldValue('arg32');
  const checkbox_arg42 = block.getFieldValue('arg42');
  const checkbox_arg52 = block.getFieldValue('arg52');
  const checkbox_arg62 = block.getFieldValue('arg62');
  const checkbox_arg72 = block.getFieldValue('arg72');
  
  const checkbox_arg03 = block.getFieldValue('arg03');
  const checkbox_arg13 = block.getFieldValue('arg13');
  const checkbox_arg23 = block.getFieldValue('arg23');
  const checkbox_arg33 = block.getFieldValue('arg33');
  const checkbox_arg43 = block.getFieldValue('arg43');
  const checkbox_arg53 = block.getFieldValue('arg53');
  const checkbox_arg63 = block.getFieldValue('arg63');
  const checkbox_arg73 = block.getFieldValue('arg73');
  
  const checkbox_arg04 = block.getFieldValue('arg04');
  const checkbox_arg14 = block.getFieldValue('arg14');
  const checkbox_arg24 = block.getFieldValue('arg24');
  const checkbox_arg34 = block.getFieldValue('arg34');
  const checkbox_arg44 = block.getFieldValue('arg44');
  const checkbox_arg54 = block.getFieldValue('arg54');
  const checkbox_arg64 = block.getFieldValue('arg64');
  const checkbox_arg74 = block.getFieldValue('arg74');
  
  const checkbox_arg05 = block.getFieldValue('arg05');
  const checkbox_arg15 = block.getFieldValue('arg15');
  const checkbox_arg25 = block.getFieldValue('arg25');
  const checkbox_arg35 = block.getFieldValue('arg35');
  const checkbox_arg45 = block.getFieldValue('arg45');
  const checkbox_arg55 = block.getFieldValue('arg55');
  const checkbox_arg65 = block.getFieldValue('arg65');
  const checkbox_arg75 = block.getFieldValue('arg75');
  
  const checkbox_arg06 = block.getFieldValue('arg06');
  const checkbox_arg16 = block.getFieldValue('arg16');
  const checkbox_arg26 = block.getFieldValue('arg26');
  const checkbox_arg36 = block.getFieldValue('arg36');
  const checkbox_arg46 = block.getFieldValue('arg46');
  const checkbox_arg56 = block.getFieldValue('arg56');
  const checkbox_arg66 = block.getFieldValue('arg66');
  const checkbox_arg76 = block.getFieldValue('arg76');
  
  const checkbox_arg07 = block.getFieldValue('arg07');
  const checkbox_arg17 = block.getFieldValue('arg17');
  const checkbox_arg27 = block.getFieldValue('arg27');
  const checkbox_arg37 = block.getFieldValue('arg37');
  const checkbox_arg47 = block.getFieldValue('arg47');
  const checkbox_arg57 = block.getFieldValue('arg57');
  const checkbox_arg67 = block.getFieldValue('arg67');
  const checkbox_arg77 = block.getFieldValue('arg77');

  function z1( b ) {
    if( b==='TRUE' ) return '1';
    return '0';
  }
  
  const code = 'SPRITE$(' + num_pattern_no + ')='
  + 'CHR$(&b' + z1( checkbox_arg00 ) + z1( checkbox_arg10 ) + z1( checkbox_arg20 ) + z1( checkbox_arg30 ) + z1( checkbox_arg40 ) + z1( checkbox_arg50 ) + z1( checkbox_arg60 ) + z1( checkbox_arg70 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg01 ) + z1( checkbox_arg11 ) + z1( checkbox_arg21 ) + z1( checkbox_arg31 ) + z1( checkbox_arg41 ) + z1( checkbox_arg51 ) + z1( checkbox_arg61 ) + z1( checkbox_arg71 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg02 ) + z1( checkbox_arg12 ) + z1( checkbox_arg22 ) + z1( checkbox_arg32 ) + z1( checkbox_arg42 ) + z1( checkbox_arg52 ) + z1( checkbox_arg62 ) + z1( checkbox_arg72 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg03 ) + z1( checkbox_arg13 ) + z1( checkbox_arg23 ) + z1( checkbox_arg33 ) + z1( checkbox_arg43 ) + z1( checkbox_arg53 ) + z1( checkbox_arg63 ) + z1( checkbox_arg73 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg04 ) + z1( checkbox_arg14 ) + z1( checkbox_arg24 ) + z1( checkbox_arg34 ) + z1( checkbox_arg44 ) + z1( checkbox_arg54 ) + z1( checkbox_arg64 ) + z1( checkbox_arg74 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg05 ) + z1( checkbox_arg15 ) + z1( checkbox_arg25 ) + z1( checkbox_arg35 ) + z1( checkbox_arg45 ) + z1( checkbox_arg55 ) + z1( checkbox_arg65 ) + z1( checkbox_arg75 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg06 ) + z1( checkbox_arg16 ) + z1( checkbox_arg26 ) + z1( checkbox_arg36 ) + z1( checkbox_arg46 ) + z1( checkbox_arg56 ) + z1( checkbox_arg66 ) + z1( checkbox_arg76 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg07 ) + z1( checkbox_arg17 ) + z1( checkbox_arg27 ) + z1( checkbox_arg37 ) + z1( checkbox_arg47 ) + z1( checkbox_arg57 ) + z1( checkbox_arg67 ) + z1( checkbox_arg77 ) + ')'
  + '\n';

  return code;
};

// SPRITE$() 16x16
javascript.javascriptGenerator.forBlock['msx_sprite_pattern_16x16'] = function(block, generator) {
  
  const num_pattern_no = block.getFieldValue('num_pattern_no');

  const checkbox_arg00 = block.getFieldValue('arg00');
  const checkbox_arg10 = block.getFieldValue('arg10');
  const checkbox_arg20 = block.getFieldValue('arg20');
  const checkbox_arg30 = block.getFieldValue('arg30');
  const checkbox_arg40 = block.getFieldValue('arg40');
  const checkbox_arg50 = block.getFieldValue('arg50');
  const checkbox_arg60 = block.getFieldValue('arg60');
  const checkbox_arg70 = block.getFieldValue('arg70');
  const checkbox_arg80 = block.getFieldValue('arg80');
  const checkbox_arg90 = block.getFieldValue('arg90');
  const checkbox_arga0 = block.getFieldValue('arga0');
  const checkbox_argb0 = block.getFieldValue('argb0');
  const checkbox_argc0 = block.getFieldValue('argc0');
  const checkbox_argd0 = block.getFieldValue('argd0');
  const checkbox_arge0 = block.getFieldValue('arge0');
  const checkbox_argf0 = block.getFieldValue('argf0');
  const checkbox_arg01 = block.getFieldValue('arg01');
  const checkbox_arg11 = block.getFieldValue('arg11');
  const checkbox_arg21 = block.getFieldValue('arg21');
  const checkbox_arg31 = block.getFieldValue('arg31');
  const checkbox_arg41 = block.getFieldValue('arg41');
  const checkbox_arg51 = block.getFieldValue('arg51');
  const checkbox_arg61 = block.getFieldValue('arg61');
  const checkbox_arg71 = block.getFieldValue('arg71');
  const checkbox_arg81 = block.getFieldValue('arg81');
  const checkbox_arg91 = block.getFieldValue('arg91');
  const checkbox_arga1 = block.getFieldValue('arga1');
  const checkbox_argb1 = block.getFieldValue('argb1');
  const checkbox_argc1 = block.getFieldValue('argc1');
  const checkbox_argd1 = block.getFieldValue('argd1');
  const checkbox_arge1 = block.getFieldValue('arge1');
  const checkbox_argf1 = block.getFieldValue('argf1');
  const checkbox_arg02 = block.getFieldValue('arg02');
  const checkbox_arg12 = block.getFieldValue('arg12');
  const checkbox_arg22 = block.getFieldValue('arg22');
  const checkbox_arg32 = block.getFieldValue('arg32');
  const checkbox_arg42 = block.getFieldValue('arg42');
  const checkbox_arg52 = block.getFieldValue('arg52');
  const checkbox_arg62 = block.getFieldValue('arg62');
  const checkbox_arg72 = block.getFieldValue('arg72');
  const checkbox_arg82 = block.getFieldValue('arg82');
  const checkbox_arg92 = block.getFieldValue('arg92');
  const checkbox_arga2 = block.getFieldValue('arga2');
  const checkbox_argb2 = block.getFieldValue('argb2');
  const checkbox_argc2 = block.getFieldValue('argc2');
  const checkbox_argd2 = block.getFieldValue('argd2');
  const checkbox_arge2 = block.getFieldValue('arge2');
  const checkbox_argf2 = block.getFieldValue('argf2');
  const checkbox_arg03 = block.getFieldValue('arg03');
  const checkbox_arg13 = block.getFieldValue('arg13');
  const checkbox_arg23 = block.getFieldValue('arg23');
  const checkbox_arg33 = block.getFieldValue('arg33');
  const checkbox_arg43 = block.getFieldValue('arg43');
  const checkbox_arg53 = block.getFieldValue('arg53');
  const checkbox_arg63 = block.getFieldValue('arg63');
  const checkbox_arg73 = block.getFieldValue('arg73');
  const checkbox_arg83 = block.getFieldValue('arg83');
  const checkbox_arg93 = block.getFieldValue('arg93');
  const checkbox_arga3 = block.getFieldValue('arga3');
  const checkbox_argb3 = block.getFieldValue('argb3');
  const checkbox_argc3 = block.getFieldValue('argc3');
  const checkbox_argd3 = block.getFieldValue('argd3');
  const checkbox_arge3 = block.getFieldValue('arge3');
  const checkbox_argf3 = block.getFieldValue('argf3');
  const checkbox_arg04 = block.getFieldValue('arg04');
  const checkbox_arg14 = block.getFieldValue('arg14');
  const checkbox_arg24 = block.getFieldValue('arg24');
  const checkbox_arg34 = block.getFieldValue('arg34');
  const checkbox_arg44 = block.getFieldValue('arg44');
  const checkbox_arg54 = block.getFieldValue('arg54');
  const checkbox_arg64 = block.getFieldValue('arg64');
  const checkbox_arg74 = block.getFieldValue('arg74');
  const checkbox_arg84 = block.getFieldValue('arg84');
  const checkbox_arg94 = block.getFieldValue('arg94');
  const checkbox_arga4 = block.getFieldValue('arga4');
  const checkbox_argb4 = block.getFieldValue('argb4');
  const checkbox_argc4 = block.getFieldValue('argc4');
  const checkbox_argd4 = block.getFieldValue('argd4');
  const checkbox_arge4 = block.getFieldValue('arge4');
  const checkbox_argf4 = block.getFieldValue('argf4');
  const checkbox_arg05 = block.getFieldValue('arg05');
  const checkbox_arg15 = block.getFieldValue('arg15');
  const checkbox_arg25 = block.getFieldValue('arg25');
  const checkbox_arg35 = block.getFieldValue('arg35');
  const checkbox_arg45 = block.getFieldValue('arg45');
  const checkbox_arg55 = block.getFieldValue('arg55');
  const checkbox_arg65 = block.getFieldValue('arg65');
  const checkbox_arg75 = block.getFieldValue('arg75');
  const checkbox_arg85 = block.getFieldValue('arg85');
  const checkbox_arg95 = block.getFieldValue('arg95');
  const checkbox_arga5 = block.getFieldValue('arga5');
  const checkbox_argb5 = block.getFieldValue('argb5');
  const checkbox_argc5 = block.getFieldValue('argc5');
  const checkbox_argd5 = block.getFieldValue('argd5');
  const checkbox_arge5 = block.getFieldValue('arge5');
  const checkbox_argf5 = block.getFieldValue('argf5');
  const checkbox_arg06 = block.getFieldValue('arg06');
  const checkbox_arg16 = block.getFieldValue('arg16');
  const checkbox_arg26 = block.getFieldValue('arg26');
  const checkbox_arg36 = block.getFieldValue('arg36');
  const checkbox_arg46 = block.getFieldValue('arg46');
  const checkbox_arg56 = block.getFieldValue('arg56');
  const checkbox_arg66 = block.getFieldValue('arg66');
  const checkbox_arg76 = block.getFieldValue('arg76');
  const checkbox_arg86 = block.getFieldValue('arg86');
  const checkbox_arg96 = block.getFieldValue('arg96');
  const checkbox_arga6 = block.getFieldValue('arga6');
  const checkbox_argb6 = block.getFieldValue('argb6');
  const checkbox_argc6 = block.getFieldValue('argc6');
  const checkbox_argd6 = block.getFieldValue('argd6');
  const checkbox_arge6 = block.getFieldValue('arge6');
  const checkbox_argf6 = block.getFieldValue('argf6');
  const checkbox_arg07 = block.getFieldValue('arg07');
  const checkbox_arg17 = block.getFieldValue('arg17');
  const checkbox_arg27 = block.getFieldValue('arg27');
  const checkbox_arg37 = block.getFieldValue('arg37');
  const checkbox_arg47 = block.getFieldValue('arg47');
  const checkbox_arg57 = block.getFieldValue('arg57');
  const checkbox_arg67 = block.getFieldValue('arg67');
  const checkbox_arg77 = block.getFieldValue('arg77');
  const checkbox_arg87 = block.getFieldValue('arg87');
  const checkbox_arg97 = block.getFieldValue('arg97');
  const checkbox_arga7 = block.getFieldValue('arga7');
  const checkbox_argb7 = block.getFieldValue('argb7');
  const checkbox_argc7 = block.getFieldValue('argc7');
  const checkbox_argd7 = block.getFieldValue('argd7');
  const checkbox_arge7 = block.getFieldValue('arge7');
  const checkbox_argf7 = block.getFieldValue('argf7');
  const checkbox_arg08 = block.getFieldValue('arg08');
  const checkbox_arg18 = block.getFieldValue('arg18');
  const checkbox_arg28 = block.getFieldValue('arg28');
  const checkbox_arg38 = block.getFieldValue('arg38');
  const checkbox_arg48 = block.getFieldValue('arg48');
  const checkbox_arg58 = block.getFieldValue('arg58');
  const checkbox_arg68 = block.getFieldValue('arg68');
  const checkbox_arg78 = block.getFieldValue('arg78');
  const checkbox_arg88 = block.getFieldValue('arg88');
  const checkbox_arg98 = block.getFieldValue('arg98');
  const checkbox_arga8 = block.getFieldValue('arga8');
  const checkbox_argb8 = block.getFieldValue('argb8');
  const checkbox_argc8 = block.getFieldValue('argc8');
  const checkbox_argd8 = block.getFieldValue('argd8');
  const checkbox_arge8 = block.getFieldValue('arge8');
  const checkbox_argf8 = block.getFieldValue('argf8');
  const checkbox_arg09 = block.getFieldValue('arg09');
  const checkbox_arg19 = block.getFieldValue('arg19');
  const checkbox_arg29 = block.getFieldValue('arg29');
  const checkbox_arg39 = block.getFieldValue('arg39');
  const checkbox_arg49 = block.getFieldValue('arg49');
  const checkbox_arg59 = block.getFieldValue('arg59');
  const checkbox_arg69 = block.getFieldValue('arg69');
  const checkbox_arg79 = block.getFieldValue('arg79');
  const checkbox_arg89 = block.getFieldValue('arg89');
  const checkbox_arg99 = block.getFieldValue('arg99');
  const checkbox_arga9 = block.getFieldValue('arga9');
  const checkbox_argb9 = block.getFieldValue('argb9');
  const checkbox_argc9 = block.getFieldValue('argc9');
  const checkbox_argd9 = block.getFieldValue('argd9');
  const checkbox_arge9 = block.getFieldValue('arge9');
  const checkbox_argf9 = block.getFieldValue('argf9');
  const checkbox_arg0a = block.getFieldValue('arg0a');
  const checkbox_arg1a = block.getFieldValue('arg1a');
  const checkbox_arg2a = block.getFieldValue('arg2a');
  const checkbox_arg3a = block.getFieldValue('arg3a');
  const checkbox_arg4a = block.getFieldValue('arg4a');
  const checkbox_arg5a = block.getFieldValue('arg5a');
  const checkbox_arg6a = block.getFieldValue('arg6a');
  const checkbox_arg7a = block.getFieldValue('arg7a');
  const checkbox_arg8a = block.getFieldValue('arg8a');
  const checkbox_arg9a = block.getFieldValue('arg9a');
  const checkbox_argaa = block.getFieldValue('argaa');
  const checkbox_argba = block.getFieldValue('argba');
  const checkbox_argca = block.getFieldValue('argca');
  const checkbox_argda = block.getFieldValue('argda');
  const checkbox_argea = block.getFieldValue('argea');
  const checkbox_argfa = block.getFieldValue('argfa');
  const checkbox_arg0b = block.getFieldValue('arg0b');
  const checkbox_arg1b = block.getFieldValue('arg1b');
  const checkbox_arg2b = block.getFieldValue('arg2b');
  const checkbox_arg3b = block.getFieldValue('arg3b');
  const checkbox_arg4b = block.getFieldValue('arg4b');
  const checkbox_arg5b = block.getFieldValue('arg5b');
  const checkbox_arg6b = block.getFieldValue('arg6b');
  const checkbox_arg7b = block.getFieldValue('arg7b');
  const checkbox_arg8b = block.getFieldValue('arg8b');
  const checkbox_arg9b = block.getFieldValue('arg9b');
  const checkbox_argab = block.getFieldValue('argab');
  const checkbox_argbb = block.getFieldValue('argbb');
  const checkbox_argcb = block.getFieldValue('argcb');
  const checkbox_argdb = block.getFieldValue('argdb');
  const checkbox_argeb = block.getFieldValue('argeb');
  const checkbox_argfb = block.getFieldValue('argfb');
  const checkbox_arg0c = block.getFieldValue('arg0c');
  const checkbox_arg1c = block.getFieldValue('arg1c');
  const checkbox_arg2c = block.getFieldValue('arg2c');
  const checkbox_arg3c = block.getFieldValue('arg3c');
  const checkbox_arg4c = block.getFieldValue('arg4c');
  const checkbox_arg5c = block.getFieldValue('arg5c');
  const checkbox_arg6c = block.getFieldValue('arg6c');
  const checkbox_arg7c = block.getFieldValue('arg7c');
  const checkbox_arg8c = block.getFieldValue('arg8c');
  const checkbox_arg9c = block.getFieldValue('arg9c');
  const checkbox_argac = block.getFieldValue('argac');
  const checkbox_argbc = block.getFieldValue('argbc');
  const checkbox_argcc = block.getFieldValue('argcc');
  const checkbox_argdc = block.getFieldValue('argdc');
  const checkbox_argec = block.getFieldValue('argec');
  const checkbox_argfc = block.getFieldValue('argfc');
  const checkbox_arg0d = block.getFieldValue('arg0d');
  const checkbox_arg1d = block.getFieldValue('arg1d');
  const checkbox_arg2d = block.getFieldValue('arg2d');
  const checkbox_arg3d = block.getFieldValue('arg3d');
  const checkbox_arg4d = block.getFieldValue('arg4d');
  const checkbox_arg5d = block.getFieldValue('arg5d');
  const checkbox_arg6d = block.getFieldValue('arg6d');
  const checkbox_arg7d = block.getFieldValue('arg7d');
  const checkbox_arg8d = block.getFieldValue('arg8d');
  const checkbox_arg9d = block.getFieldValue('arg9d');
  const checkbox_argad = block.getFieldValue('argad');
  const checkbox_argbd = block.getFieldValue('argbd');
  const checkbox_argcd = block.getFieldValue('argcd');
  const checkbox_argdd = block.getFieldValue('argdd');
  const checkbox_arged = block.getFieldValue('arged');
  const checkbox_argfd = block.getFieldValue('argfd');
  const checkbox_arg0e = block.getFieldValue('arg0e');
  const checkbox_arg1e = block.getFieldValue('arg1e');
  const checkbox_arg2e = block.getFieldValue('arg2e');
  const checkbox_arg3e = block.getFieldValue('arg3e');
  const checkbox_arg4e = block.getFieldValue('arg4e');
  const checkbox_arg5e = block.getFieldValue('arg5e');
  const checkbox_arg6e = block.getFieldValue('arg6e');
  const checkbox_arg7e = block.getFieldValue('arg7e');
  const checkbox_arg8e = block.getFieldValue('arg8e');
  const checkbox_arg9e = block.getFieldValue('arg9e');
  const checkbox_argae = block.getFieldValue('argae');
  const checkbox_argbe = block.getFieldValue('argbe');
  const checkbox_argce = block.getFieldValue('argce');
  const checkbox_argde = block.getFieldValue('argde');
  const checkbox_argee = block.getFieldValue('argee');
  const checkbox_argfe = block.getFieldValue('argfe');
  const checkbox_arg0f = block.getFieldValue('arg0f');
  const checkbox_arg1f = block.getFieldValue('arg1f');
  const checkbox_arg2f = block.getFieldValue('arg2f');
  const checkbox_arg3f = block.getFieldValue('arg3f');
  const checkbox_arg4f = block.getFieldValue('arg4f');
  const checkbox_arg5f = block.getFieldValue('arg5f');
  const checkbox_arg6f = block.getFieldValue('arg6f');
  const checkbox_arg7f = block.getFieldValue('arg7f');
  const checkbox_arg8f = block.getFieldValue('arg8f');
  const checkbox_arg9f = block.getFieldValue('arg9f');
  const checkbox_argaf = block.getFieldValue('argaf');
  const checkbox_argbf = block.getFieldValue('argbf');
  const checkbox_argcf = block.getFieldValue('argcf');
  const checkbox_argdf = block.getFieldValue('argdf');
  const checkbox_argef = block.getFieldValue('argef');
  const checkbox_argff = block.getFieldValue('argff');

  function z1( b ) {
    if( b==='TRUE' ) return '1';
    return '0';
  }
  
  var code = 'os$='
  + 'CHR$(&b' + z1( checkbox_arg00 ) + z1( checkbox_arg10 ) + z1( checkbox_arg20 ) + z1( checkbox_arg30 ) + z1( checkbox_arg40 ) + z1( checkbox_arg50 ) + z1( checkbox_arg60 ) + z1( checkbox_arg70 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg01 ) + z1( checkbox_arg11 ) + z1( checkbox_arg21 ) + z1( checkbox_arg31 ) + z1( checkbox_arg41 ) + z1( checkbox_arg51 ) + z1( checkbox_arg61 ) + z1( checkbox_arg71 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg02 ) + z1( checkbox_arg12 ) + z1( checkbox_arg22 ) + z1( checkbox_arg32 ) + z1( checkbox_arg42 ) + z1( checkbox_arg52 ) + z1( checkbox_arg62 ) + z1( checkbox_arg72 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg03 ) + z1( checkbox_arg13 ) + z1( checkbox_arg23 ) + z1( checkbox_arg33 ) + z1( checkbox_arg43 ) + z1( checkbox_arg53 ) + z1( checkbox_arg63 ) + z1( checkbox_arg73 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg04 ) + z1( checkbox_arg14 ) + z1( checkbox_arg24 ) + z1( checkbox_arg34 ) + z1( checkbox_arg44 ) + z1( checkbox_arg54 ) + z1( checkbox_arg64 ) + z1( checkbox_arg74 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg05 ) + z1( checkbox_arg15 ) + z1( checkbox_arg25 ) + z1( checkbox_arg35 ) + z1( checkbox_arg45 ) + z1( checkbox_arg55 ) + z1( checkbox_arg65 ) + z1( checkbox_arg75 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg06 ) + z1( checkbox_arg16 ) + z1( checkbox_arg26 ) + z1( checkbox_arg36 ) + z1( checkbox_arg46 ) + z1( checkbox_arg56 ) + z1( checkbox_arg66 ) + z1( checkbox_arg76 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg07 ) + z1( checkbox_arg17 ) + z1( checkbox_arg27 ) + z1( checkbox_arg37 ) + z1( checkbox_arg47 ) + z1( checkbox_arg57 ) + z1( checkbox_arg67 ) + z1( checkbox_arg77 ) + ')'
  + '\n';

  code = code + 'os$=os$+'
  + 'CHR$(&b' + z1( checkbox_arg08 ) + z1( checkbox_arg18 ) + z1( checkbox_arg28 ) + z1( checkbox_arg38 ) + z1( checkbox_arg48 ) + z1( checkbox_arg58 ) + z1( checkbox_arg68 ) + z1( checkbox_arg78 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg09 ) + z1( checkbox_arg19 ) + z1( checkbox_arg29 ) + z1( checkbox_arg39 ) + z1( checkbox_arg49 ) + z1( checkbox_arg59 ) + z1( checkbox_arg69 ) + z1( checkbox_arg79 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg0a ) + z1( checkbox_arg1a ) + z1( checkbox_arg2a ) + z1( checkbox_arg3a ) + z1( checkbox_arg4a ) + z1( checkbox_arg5a ) + z1( checkbox_arg6a ) + z1( checkbox_arg7a ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg0b ) + z1( checkbox_arg1b ) + z1( checkbox_arg2b ) + z1( checkbox_arg3b ) + z1( checkbox_arg4b ) + z1( checkbox_arg5b ) + z1( checkbox_arg6b ) + z1( checkbox_arg7b ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg0c ) + z1( checkbox_arg1c ) + z1( checkbox_arg2c ) + z1( checkbox_arg3c ) + z1( checkbox_arg4c ) + z1( checkbox_arg5c ) + z1( checkbox_arg6c ) + z1( checkbox_arg7c ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg0d ) + z1( checkbox_arg1d ) + z1( checkbox_arg2d ) + z1( checkbox_arg3d ) + z1( checkbox_arg4d ) + z1( checkbox_arg5d ) + z1( checkbox_arg6d ) + z1( checkbox_arg7d ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg0e ) + z1( checkbox_arg1e ) + z1( checkbox_arg2e ) + z1( checkbox_arg3e ) + z1( checkbox_arg4e ) + z1( checkbox_arg5e ) + z1( checkbox_arg6e ) + z1( checkbox_arg7e ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg0f ) + z1( checkbox_arg1f ) + z1( checkbox_arg2f ) + z1( checkbox_arg3f ) + z1( checkbox_arg4f ) + z1( checkbox_arg5f ) + z1( checkbox_arg6f ) + z1( checkbox_arg7f ) + ')'
  + '\n';

  code = code + 'os$=os$+'
  + 'CHR$(&b' + z1( checkbox_arg80 ) + z1( checkbox_arg90 ) + z1( checkbox_arga0 ) + z1( checkbox_argb0 ) + z1( checkbox_argc0 ) + z1( checkbox_argd0 ) + z1( checkbox_arge0 ) + z1( checkbox_argf0 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg81 ) + z1( checkbox_arg91 ) + z1( checkbox_arga1 ) + z1( checkbox_argb1 ) + z1( checkbox_argc1 ) + z1( checkbox_argd1 ) + z1( checkbox_arge1 ) + z1( checkbox_argf1 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg82 ) + z1( checkbox_arg92 ) + z1( checkbox_arga2 ) + z1( checkbox_argb2 ) + z1( checkbox_argc2 ) + z1( checkbox_argd2 ) + z1( checkbox_arge2 ) + z1( checkbox_argf2 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg83 ) + z1( checkbox_arg93 ) + z1( checkbox_arga3 ) + z1( checkbox_argb3 ) + z1( checkbox_argc3 ) + z1( checkbox_argd3 ) + z1( checkbox_arge3 ) + z1( checkbox_argf3 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg84 ) + z1( checkbox_arg94 ) + z1( checkbox_arga4 ) + z1( checkbox_argb4 ) + z1( checkbox_argc4 ) + z1( checkbox_argd4 ) + z1( checkbox_arge4 ) + z1( checkbox_argf4 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg85 ) + z1( checkbox_arg95 ) + z1( checkbox_arga5 ) + z1( checkbox_argb5 ) + z1( checkbox_argc5 ) + z1( checkbox_argd5 ) + z1( checkbox_arge5 ) + z1( checkbox_argf5 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg86 ) + z1( checkbox_arg96 ) + z1( checkbox_arga6 ) + z1( checkbox_argb6 ) + z1( checkbox_argc6 ) + z1( checkbox_argd6 ) + z1( checkbox_arge6 ) + z1( checkbox_argf6 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg87 ) + z1( checkbox_arg97 ) + z1( checkbox_arga7 ) + z1( checkbox_argb7 ) + z1( checkbox_argc7 ) + z1( checkbox_argd7 ) + z1( checkbox_arge7 ) + z1( checkbox_argf7 ) + ')'
  + '\n';

  code = code + 'os$=os$+'
  + 'CHR$(&b' + z1( checkbox_arg88 ) + z1( checkbox_arg98 ) + z1( checkbox_arga8 ) + z1( checkbox_argb8 ) + z1( checkbox_argc8 ) + z1( checkbox_argd8 ) + z1( checkbox_arge8 ) + z1( checkbox_argf8 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg89 ) + z1( checkbox_arg99 ) + z1( checkbox_arga9 ) + z1( checkbox_argb9 ) + z1( checkbox_argc9 ) + z1( checkbox_argd9 ) + z1( checkbox_arge9 ) + z1( checkbox_argf9 ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg8a ) + z1( checkbox_arg9a ) + z1( checkbox_argaa ) + z1( checkbox_argba ) + z1( checkbox_argca ) + z1( checkbox_argda ) + z1( checkbox_argea ) + z1( checkbox_argfa ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg8b ) + z1( checkbox_arg9b ) + z1( checkbox_argab ) + z1( checkbox_argbb ) + z1( checkbox_argcb ) + z1( checkbox_argdb ) + z1( checkbox_argeb ) + z1( checkbox_argfb ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg8c ) + z1( checkbox_arg9c ) + z1( checkbox_argac ) + z1( checkbox_argbc ) + z1( checkbox_argcc ) + z1( checkbox_argdc ) + z1( checkbox_argec ) + z1( checkbox_argfc ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg8d ) + z1( checkbox_arg9d ) + z1( checkbox_argad ) + z1( checkbox_argbd ) + z1( checkbox_argcd ) + z1( checkbox_argdd ) + z1( checkbox_arged ) + z1( checkbox_argfd ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg8e ) + z1( checkbox_arg9e ) + z1( checkbox_argae ) + z1( checkbox_argbe ) + z1( checkbox_argce ) + z1( checkbox_argde ) + z1( checkbox_argee ) + z1( checkbox_argfe ) + ')+'
  + 'CHR$(&b' + z1( checkbox_arg8f ) + z1( checkbox_arg9f ) + z1( checkbox_argaf ) + z1( checkbox_argbf ) + z1( checkbox_argcf ) + z1( checkbox_argdf ) + z1( checkbox_argef ) + z1( checkbox_argff ) + ')'
  + '\n';

  code = code + 'SPRITE$(' + num_pattern_no + ')=os$\n';

  return code;
};

/******************************************
    カテゴリ：音
******************************************/

// PLAY
javascript.javascriptGenerator.forBlock['msx_play'] = function(block, generator)  {

  const str_mml_a = block.getFieldValue('str_mml_a');
  const str_mml_b = block.getFieldValue('str_mml_b');
  const str_mml_c = block.getFieldValue('str_mml_c');

  const code = `PLAY ${str_mml_a},${str_mml_b},${str_mml_c}\n`;

  return code;
};

// SOUND
javascript.javascriptGenerator.forBlock['msx_sound'] = function(block, generator)  {

  const num_channel = block.getFieldValue('num_channel');
  const num_param = block.getFieldValue('num_param');

  const code = `SOUND ${num_channel},${num_param}\n`;

  return code;
};

// BEEP
javascript.javascriptGenerator.forBlock['msx_beep'] = function(block, generator) {

  const code = "BEEP\n";

  return code;
};

/******************************************
    カテゴリ：制御
******************************************/

//メイン以外のブロックの塊がコード化されていても無視する用
javascript.javascriptGenerator.forBlock['msx_main'] = function(block, generator) {

  const statement_do = generator.statementToCode(block, 'statement_do');
  
  // MSX_main_startのある行からMSX_main_endのある行までは
  // コード生成時に強制的に先頭に移動させられる
  const code = MSX_main_start + "\n"
             + statement_do
             + "  END\n"
             + MSX_main_end + "\n";

  return code;
};

// REM
javascript.javascriptGenerator.forBlock['msx_rem'] = function(block, generator) {

  const code = "REM\n"; //全角を出力するとMSXに吐けなくなる

  return code;
};

// 書いたコードをそのまま出力する
javascript.javascriptGenerator.forBlock['msx_eval'] = function(block, generator) {

  const code = block.getFieldValue('str_do') + '\n';

  return code;
};

// FOR..NEXT
javascript.javascriptGenerator.forBlock['msx_for'] = function(block, generator) {
  const str_varable = block.getFieldValue('str_varable');
  const num_start = block.getFieldValue('num_start');
  const num_dest = block.getFieldValue('num_dest');
  const num_step = block.getFieldValue('num_step');
  const statement_do = generator.statementToCode(block, 'statement_do');
  
  const code = 'FOR ' + str_varable + '=' + num_start + ' TO ' + num_dest + ' STEP ' + num_step + '\n'
        + statement_do
        + 'NEXT ' + str_varable + '\n'; //べーしっ君用に変数名も出力

  return code;
};

// 無限ループ Scratchにあるので
javascript.javascriptGenerator.forBlock['msx_loop'] = function(block, generator) {

  const statement_do = generator.statementToCode(block, 'statement_do');

  LabelCount++;
  const code = `'while(1) __while:${LabelCount}__\n${statement_do}  GOTO __while-${LabelCount}__\n'end-while\n`;

  return code;
};

// 他言語によくあるwhile(){}
// # Scratchのは条件が成立するまでのループなのでだまされる
javascript.javascriptGenerator.forBlock['msx_while'] = function(block, generator) {

  const num_condition = block.getFieldValue('num_condition');
  const statement_do = generator.statementToCode(block, 'statement_do');

  LabelCount++;
  const code = `'while __while:${LabelCount}__\n  IF not(${num_condition}) THEN __endwhile-${LabelCount}__\n${statement_do}  GOTO __while-${LabelCount}__\n'end-while __endwhile:${LabelCount}__\n`;

  return code;
};

// ブロックIF(..THEN..)
javascript.javascriptGenerator.forBlock['msx_if_then'] = function(block, generator) {

  const num_condition = block.getFieldValue('num_condition');
  const statement_then = generator.statementToCode(block, 'statement_then');

  LabelCount++;
  const code = `IF not(${num_condition}) THEN __endif-${LabelCount}__\n${statement_then}'end-if __endif:${LabelCount}__\n`;

  return code;
};

// ブロックIF(..THEN..ELSE..)
javascript.javascriptGenerator.forBlock['msx_if_else'] = function(block, generator) {

  const num_condition = block.getFieldValue('num_condition');
  const statement_then = generator.statementToCode(block, 'statement_then');
  const statement_else = generator.statementToCode(block, 'statement_else');

  LabelCount++;
  const code = `IF not(${num_condition}) THEN __else-${LabelCount}__\n${statement_then}  goto __endif-${LabelCount}__\n'else __else:${LabelCount}__\n${statement_else}'end-if __endif:${LabelCount}__\n`;

  return code;
};

// ON ERROR GOTOを隠蔽したエラートラップ(ただしべーしっ君非対応)
javascript.javascriptGenerator.forBlock['msx_try_catch'] = function(block, generator) {

  const statement_try = generator.statementToCode(block, 'statement_try');
  const statement_catch = generator.statementToCode(block, 'statement_catch');

  LabelCount++;
  const code = `'try\n  ON ERROR GOTO __errcatch-${LabelCount}__\n${statement_try}  goto __enderr-${LabelCount}__\n'catch __errcatch:${LabelCount}__\n${statement_catch}  RESUME __enderr-${LabelCount}__\n'end-try __enderr:${LabelCount}__\nON ERROR GOTO 0\n`;

  return code;
};

// END
javascript.javascriptGenerator.forBlock['msx_end'] = function(block, generator) {

  const code = "END\n";

  return code;
};

// RUN"ファイル名"
javascript.javascriptGenerator.forBlock['msx_run2file'] = function(block, generator) {

  const str_filename = block.getFieldValue('str_filename');

  const code = 'RUN' + str_filename + '\n';

  return code;
};

/******************************************
    カテゴリ：ブロック定義
******************************************/

// GOSUB..RETURNを隠蔽したサブルーチンの定義
javascript.javascriptGenerator.forBlock['msx_subprocedure'] = function(block, generator) {

  const str_proc_name = block.getFieldValue('str_proc_name');
  const statement_sub = generator.statementToCode(block, 'statement_sub');

  LabelCount++;
  const code = `'subroutine __subproc:"${str_proc_name}"__\n${statement_sub}RETURN\n`;

  return code;
};

// GOSUB..RETURNを隠蔽したサブルーチンの呼出
javascript.javascriptGenerator.forBlock['msx_call_subproc'] = function(block, generator) {

  const str_proc_name = block.getFieldValue('str_proc_name');
  
  const code = 'GOSUB __subproc-"' + str_proc_name + '"__\n';

  return code;
};
  
// ON INTERVALを隠蔽したサブルーチンの定義
javascript.javascriptGenerator.forBlock['msx_on_interval'] = function(block, generator) {

  const statement_sub = generator.statementToCode(block, 'statement_sub');

  LabelCount++;
  const code = `'label:on_interval_gosub __oninterval:1__\n${statement_sub}RETURN\n`;

  return code;
};

// ON INTERVALの割込間隔と呼出先の設定
javascript.javascriptGenerator.forBlock['msx_on_interval_set'] = function(block, generator)  {

  const num_interval = block.getFieldValue('num_interval');
  
  const code = 'ON INTERVAL=' + num_interval + ' GOSUB __oninterval-1__\n';

  return code;
};

// ON INTERVALの許可
javascript.javascriptGenerator.forBlock['msx_on_interval_enable'] = function(block, generator)  {

  const str_mode = block.getFieldValue('str_mode');
  
  const code = 'INTERVAL ' + str_mode + '\n';

  return code;
};

// ON SPRITEを隠蔽したサブルーチンの定義
javascript.javascriptGenerator.forBlock['msx_on_sprite'] = function(block, generator) {

  const statement_sub = generator.statementToCode(block, 'statement_sub');

  LabelCount++;
  const code = `'label:on_sprite_gosub __onsprite:1__\n${statement_sub}RETURN\n`;

  return code;
};

// ON SPRITEの許可と呼出先の設定
javascript.javascriptGenerator.forBlock['msx_on_sprite_enable'] = function(block, generator)  {

  const str_mode = block.getFieldValue('str_mode');
  
  var code = 'SPRITE ' + str_mode + '\n';
  if( str_mode === 'ON'){
    code = 'ON SPRITE GOSUB __onsprite-1__ :SPRITE ' + str_mode + '\n';
  }
  return code;
};

// ON STRIGを隠蔽したサブルーチンの定義
javascript.javascriptGenerator.forBlock['msx_on_strig'] = function(block, generator) {

  const statement_sub = generator.statementToCode(block, 'statement_sub');

  LabelCount++;
  const code = `'label:on_strig_gosub __onstrig:1__\n${statement_sub}RETURN\n`;

  return code;
};

// ON STRIGの許可と呼出先の設定
javascript.javascriptGenerator.forBlock['msx_on_strig_enable'] = function(block, generator)  {

  const str_mode = block.getFieldValue('str_mode');
  
  var code = 'STRIG(0) ' + str_mode + '\n';
  if( str_mode === 'ON'){
    code = 'ON STRIG GOSUB __onstrig-1__ :STRIG(0) ' + str_mode + '\n';
  }
  return code;
};
  
/******************************************
    カテゴリ：調べる
******************************************/

// INPUT
javascript.javascriptGenerator.forBlock['msx_input'] = function(block, generator) {

  const str_prompt = block.getFieldValue('str_prompt');
  const str_result = block.getFieldValue('str_result');

  const code = 'INPUT ' + str_prompt + ';' + str_result + '\n';

  return code;
};

// LINE INPUT
javascript.javascriptGenerator.forBlock['msx_lineinput'] = function(block, generator) {

  const str_prompt = block.getFieldValue('str_prompt');
  const str_result = block.getFieldValue('str_result');

  const code = 'LINE INPUT ' + str_prompt + ';' + str_result + '\n';

  return code;
};

// INKEY$の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_inkey'] = function(block) {

  const code = "INKEY$";

  return [code, javascript.javascriptGenerator.ORDER_NONE];
};

// INPUT$()の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_inputdollar'] = function(block) {

  const num_chrs = block.getFieldValue('num_chrs');
  
  const code = "INPUT$(" + num_chrs +")";

  return [code, javascript.javascriptGenerator.ORDER_NONE];
};

// STICK()の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_stick'] = function(block) {
  
  const num_stick = block.getFieldValue('num_stick');
  
  const code = "STICK(" + num_stick + ")";
  
  return [code, javascript.javascriptGenerator.ORDER_NONE];
};

// STRIG()の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_strig'] = function(block) {

  const num_strig = block.getFieldValue('num_strig');
  
  const code = "STRIG(" + num_strig + ")";

  return [code, javascript.javascriptGenerator.ORDER_NONE];
};

// 指定した整数の範囲内の値を返すブロック Scratchにあるので
javascript.javascriptGenerator.forBlock['msx_random'] = function(block) {

  const num_min = block.getFieldValue('num_min');
  const num_max = block.getFieldValue('num_max');
  
  const code = `INT(RND(1)*(${num_max}-${num_min}+1)+${num_min})`;

  return [code, javascript.javascriptGenerator.ORDER_NONE];
};

// TIMEの値を返すブロック
javascript.javascriptGenerator.forBlock['msx_time'] = function(block) {

  const code = "TIME";

  return [code, javascript.javascriptGenerator.ORDER_NONE];
};

// TIMEをゼロにする Scratchにあるので
javascript.javascriptGenerator.forBlock['msx_time_reset'] = function(block, generator) {

  const code = "TIME=0\n";

  return code;
};

/******************************************
    カテゴリ：変数
******************************************/

// DEFINT/SNG/DBL A-Z
javascript.javascriptGenerator.forBlock['msx_deftype'] = function(block, generator)  {

  const str_deftype = block.getFieldValue('str_deftype');

  const code = 'DEF' + str_deftype + ' A-Z\n';

  return code;
};

// DIM
javascript.javascriptGenerator.forBlock['msx_dim'] = function(block, generator)  {

  const str_var_array = block.getFieldValue('str_var_array');

  const code = 'DIM ' + str_var_array + '\n';

  return code;
};

// LET
javascript.javascriptGenerator.forBlock['msx_let'] = function(block, generator)  {

  const str_let_arg0 = block.getFieldValue('str_let_arg0');
  const str_let_arg1 = block.getFieldValue('str_let_arg1');

  const code = str_let_arg0 + '=' + str_let_arg1 + '\n';

  return code;
};

// 値を返すブロック用のLET
javascript.javascriptGenerator.forBlock['msx_let_f'] = function(block, generator)  {

  const str_let_arg0 = block.getFieldValue('str_let_arg0');
  const str_let_arg1 = javascript.javascriptGenerator.valueToCode(block, 'str_let_arg1', javascript.javascriptGenerator.ORDER_NONE);

  const code = str_let_arg0 + '=' + str_let_arg1 + '\n';

  return code;
};

/******************************************
    カテゴリ：実験
******************************************/

// これはGeminiが書いたサンプル
// 引数に文字列を追加した値を返すブロック
javascript.javascriptGenerator.forBlock['add_exclamation'] = function(block) {

  const text = block.getFieldValue('TEXT');
  const code = text + "！";

  return [code, javascript.javascriptGenerator.ORDER_NONE];
};

// これもGeminiが書いたサンプル
// 文字列を返すブロックを受け入れるブロック
javascript.javascriptGenerator.forBlock['print_text'] = function(block) {

  if (!block.getInput('TEXT').connection.targetBlock()) { // まだ接続されていない場合
    var textBlock = block.workspace.newBlock('text_field_block'); // text_field_block を作成
    textBlock.initSvg(); // SVG を初期化
    textBlock.render(); // 描画
    block.getInput('TEXT').connection.connect(textBlock.outputConnection); // 接続
  }
  var text = javascript.javascriptGenerator.valueToCode(block, 'TEXT', javascript.javascriptGenerator.ORDER_NONE);
  const code = 'console.log(' + text + ');\n';

  return code;
};

//テキストフィールドだけのブロック
javascript.javascriptGenerator.forBlock['text_field_block'] = function(block) {
  var text = block.getFieldValue('TEXT');
  return [text, javascript.javascriptGenerator.ORDER_NONE];
};


/*
// 改行付きテキストボックス:カスタムフィールドを定義
// カスタムフィールドをclassで定義
class FieldMultilineText extends Blockly.Field {
  constructor(text) {
    super(text || '');
    this.text_ = text || '';
    this.SERIALIZABLE = true; // インスタンスごとにも設定してみる
  }

  static fromJson(options) {
    return new FieldMultilineText(options['text']);
  }

  initView() {
    this.createTextElement_();
    this.textElement_ = Blockly.utils.dom.createSvgElement('foreignObject', {
      x: 0,
      y: -8,
      width: 200,
      height: 100
    }, this.fieldGroup_);
    this.textarea_ = document.createElement('textarea');
    this.textarea_.style.width = '180px';
    this.textarea_.style.height = '80px';
    this.textarea_.style.resize = 'none';
    this.textarea_.value = this.text_;
    this.textElement_.appendChild(this.textarea_);
  }

  getValue() {
    return this.textarea_ ? this.textarea_.value : this.text_;
  }

  setValue(newValue) {
    if (newValue === null || newValue === undefined) return;
    if (this.textarea_) {
      this.textarea_.value = newValue;
    }
    this.text_ = newValue;
  }

  showEditor_() {
    this.textarea_.focus();
  }
}

// 静的プロパティとしてSERIALIZABLEを設定
//FieldMultilineText.SERIALIZABLE = true;

// フィールドを登録
Blockly.fieldRegistry.register('field_multilinetext', FieldMultilineText);

// ブロック定義
Blockly.Blocks['multi_comment'] = {
  init: function() {
    this.jsonInit({
      "type": "multi_comment",
      "message0": "コメント %1",
      "args0": [
        {
          "type": "field_multilinetext",
          "name": "COMMENT",
          "text": "ここに\nコメントを\n入力"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 160
    });
  }
};

Blockly.JavaScript['multi_comment'] = function(block) {
  var comment = block.getFieldValue('COMMENT');
  var lines = comment.split('\n');
  var code = lines.map(line => `REM ${line}`).join('\n') + '\n';
  return code;
};
*/

