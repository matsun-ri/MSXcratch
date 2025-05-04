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
    カテゴリ：画面
******************************************/
    {
      "type": "msx_screen",
      "tooltip": "SCREEN n\n画面モードを指定します",
      "message0": "画面モード %1",
      "args0": [
        {
          "type": "input_value",
          "name": "num_screen_no",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "WIDTH\nテキスト画面の桁数を指定します\n●MSXべーしっ君非対応",
      "message0": "●画面の桁数 %1", //WIDTH
      "args0": [
      {
        "type": "input_value",
        "name": "num_width",
        "shadow": {
          "type": "number_input",
        }
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
      "tooltip": "KEY ON/OFF\nファンクションキーの表示を設定します",
      "message0": "ファンクションキーを%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "str_key_view",
          "options": [
            ["表示する", "ON"],
            ["表示しない", "OFF"]
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
    {
      "type": "msx_color",
      "tooltip": "COLOR n,n,n\n画面の色を指定します",
      "message0": "文字色%1 背景色%2 周辺色%3",
      "args0": [
        {
          "type": "input_value",
          "name": "num_fore",
          "shadow": {
            "type": "number_input",
          }
          },
        {
          "type": "input_value",
          "name": "num_back",
          "shadow": {
            "type": "number_input",
          }
          },
        {
          "type": "input_value",
          "name": "num_surr",
          "shadow": {
            "type": "number_input",
          }
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
      "type": "msx_cls",
      "tooltip": "CLS\n画面に表示されているものをすべて消去します",
      "message0": "すべてを消す",
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_locate",
      "tooltip": "LOCATE x,y\nテキストカーソルの位置を指定します",
      "message0": "カーソルの位置 横%1, 縦%2",
      "args0": [
        {
        "type": "input_value",
        "name": "num_x",
        "shadow": {
          "type": "number_input",
          }
        },
        {
        "type": "input_value",
        "name": "num_y",
        "shadow": {
          "type": "number_input",
          }
        },
      ],
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_print",
      "tooltip": "PRINT\nテキストを出力します",
      "message0": "%1 と言う",
      "args0": [
        {
        "type": "input_value",
        "name": "str_text",
        "shadow": {
          "type": "text_input",
          }
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
      "type": "msx_pos",
      "tooltip": "POS(0)\nテキストカーソルのx座標がわかる\n（数値）",
      "message0": "カーソルのX座標",
      "output": "String",
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_csrlin",
      "tooltip": "CSRLIN\nテキストカーソルのy座標がわかる\n（数値）",
      "message0": "カーソルのY座標",
      "output": "String",
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_palette",
      "tooltip": "COLOR=(c,r,g,b)\nパレットの色を設定します",
      "message0": "パレット %1 番に赤 %2 緑 %3 青 %4 を設定する",
      "args0": [
        {
          "type": "input_value",
          "name": "num_paletteno",
          "shadow": {
            "type": "number_input",
          }
          },
        {
          "type": "input_value",
          "name": "num_r",
          "shadow": {
            "type": "number_input",
          }
          },
        {
          "type": "input_value",
          "name": "num_g",
          "shadow": {
            "type": "number_input",
          }
          },
        {
          "type": "input_value",
          "name": "num_b",
          "shadow": {
            "type": "number_input",
          }
          }
      ],
      "previousStatement": null,
      "nextStatement": null,
    //  "inputsInline": true,
    "colour": "rgb(82, 151, 250)",
    "helpUrl": ""
    }
    ,
    {
      "type": "msx_vdp_read",
      "tooltip": "VDP(n)\nVDPのレジスタの値がわかる\n（数値）",
      "message0": "VDPのレジスタ%1番の値",
      "args0": [
        {
          "type": "input_value",
          "name": "num_reg",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_vdp_write",
      "tooltip": "VDP(n)\nVDPのレジスタに値を書き込みます",
      "message0": "VDPのレジスタ%1番に%2を書き込む",
      "args0": [
        {
          "type": "input_value",
          "name": "num_reg",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_data",
          "shadow": {
            "type": "number_input",
          }
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
      "type": "msx_vpeek",
      "tooltip": "VPEEK(n)\nVRAMの指定した番地の値がわかる\n（数値）",
      "message0": "VRAMの%1番地の値",
      "args0": [
        {
          "type": "input_value",
          "name": "num_addr",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(82, 151, 250)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_vpoke",
      "tooltip": "VPOKE a,d\nVRAMの指定した番地に値を書き込みます",
      "message0": "VRAMの%1番地に%2を書き込む",
      "args0": [
        {
          "type": "input_value",
          "name": "num_addr",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_data",
          "shadow": {
            "type": "number_input",
          }
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
    カテゴリ：グラフィックス
******************************************/
    {
      "type": "msx_setpage_visible",
      "tooltip": "SET PAGE n\n表示するグラフィック画面を指定します",
      "message0": "表示対象のページ%1",
      "args0": [
        {
          "type": "input_value",
          "name": "num_page",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "SET PAGE ,n\n描画対象のグラフィック画面を指定します",
      "message0": "描画対象のページ%1",
      "args0": [
        {
          "type": "input_value",
          "name": "num_page",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "LINE\nグラフィック画面に線を引きます",
      "message0": "線を引く 座標 %1 , %2 から%3 , %4 まで \n色 %5 論理演算 %6",
      "args0": [
        {
          "type": "input_value",
          "name": "num_x1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_x2",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y2",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_c",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "LINE ,B/BF\nグラフィック画面に枠を描きます",
      "message0": "枠を描く 座標 %1 , %2 から%3 , %4 まで \n色 %5 塗りつぶし %6 論理演算 %7",
      "args0": [
        {
          "type": "input_value",
          "name": "num_x1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_x2",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y2",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_c",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "CIRCLE\nグラフィック画面に円を描きます",
      "message0": "円を描く 座標 %1 , %2 半径 %3 色 %4",
      "args0": [
        {
          "type": "input_value",
          "name": "num_x",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_r",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_c",
          "shadow": {
            "type": "number_input",
          }
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
      "type": "msx_pset",
      "tooltip": "PSET\nグラフィック画面に点を描きます",
      "message0": "点を描く 座標 %1 , %2 色 %3  論理演算 %4",
      "args0": [
        {
          "type": "input_value",
          "name": "num_x",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_c",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "PAINT\nグラフィック画面の境界色で囲まれた部分を塗りつぶします",
      "message0": "塗りつぶす 座標 %1 , %2 塗りつぶし色 %3 境界色 %4",
      "args0": [
        {
          "type": "input_value",
          "name": "num_x",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_paint_color",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_border_color",
          "shadow": {
            "type": "number_input",
          }
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
      "type": "msx_copy",
      "tooltip": "COPY\nグラフィック画面の一部をコピーします",
      "message0": "画像コピー %1 , %2 から%3 , %4 までの範囲を %5 %6 , %7 へ %8",
      "args0": [
        {
          "type": "input_value",
          "name": "num_sx1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_sy1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_sx2",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_sy2",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_value",
          "name": "num_dx1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_dy1",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "COPY\nグラフィック画面の一部を、ページを超えてコピーします",
      "message0": "画像コピー \nページ %1 の %2 , %3 から%4 , %5 までの範囲を %6\n ページ %7 の %8 , %9 へ 論理演算 %10 %11",
      "args0": [
        {
          "type": "input_value",
          "name": "num_src_page",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_sx1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_sy1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_sx2",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_sy2",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_value",
          "name": "num_dest_page",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_dx1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_dy1",
          "shadow": {
            "type": "number_input",
          }
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
    {
      "type": "msx_point",
      "tooltip": "POINT\nグラフィック画面の指定した場所の色コードがわかる\n（数値）",
      "message0": "座標%1,%2の色コード",
      "args0": [
        {
          "type": "input_value",
          "name": "num_x",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(127, 120, 222)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：スプライト
******************************************/
    {
      "type": "msx_sprite_size",
      "tooltip": "SCREEN ,n\nスプライトサイズを指定します",
      "message0": "スプライトサイズ %1",  //SCREENの第2引数
      "args0": [
        {
          "type": "field_dropdown",
          "name": "num_sprite_size",
          "options": [
            ["8x8", "0"],
            ["8x8を2倍に拡大", "1"],
            ["16x16", "2"],
            ["16x16を2倍に拡大", "3"]
          ]
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
      "tooltip": "PUT SPRITE\nスプライトを表示します",
      "message0": "スプライト表示 優先度%1 座標%2 , %3 %4 色番号 %5 パターン番号 %6 %7",
      "args0": [
        {
          "type": "input_value",
          "name": "num_priority",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_x",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_y",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_value",
          "name": "num_color",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_pattern",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "SPRITE$(n)\n8x8サイズのスプライトパターンを定義します",
      "message0": "スプライトパターン(8x8) 番号 %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31 %32 %33 %34 %35 %36 %37 %38 %39 %40 %41 %42 %43 %44 %45 %46 %47 %48 %49 %50 %51 %52 %53 %54 %55 %56 %57 %58 %59 %60 %61 %62 %63 %64 %65 %66 %67 %68 %69 %70 %71 %72 %73",
      "args0": [
        {
          "type": "input_value",
          "name": "num_pattern_no",
          "shadow": {
            "type": "number_input",
          }
        },
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
      "tooltip": "SPRITE$(n)\n16x16サイズのスプライトパターンを定義します",
      "message0": "スプライトパターン(16x16) 番号 %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31 %32 %33 %34 %35 %36 %37 %38 %39 %40 %41 %42 %43 %44 %45 %46 %47 %48 %49 %50 %51 %52 %53 %54 %55 %56 %57 %58 %59 %60 %61 %62 %63 %64 %65 %66 %67 %68 %69 %70 %71 %72 %73 %74 %75 %76 %77 %78 %79 %80 %81 %82 %83 %84 %85 %86 %87 %88 %89 %90 %91 %92 %93 %94 %95 %96 %97 %98 %99 %100 %101 %102 %103 %104 %105 %106 %107 %108 %109 %110 %111 %112 %113 %114 %115 %116 %117 %118 %119 %120 %121 %122 %123 %124 %125 %126 %127 %128 %129 %130 %131 %132 %133 %134 %135 %136 %137 %138 %139 %140 %141 %142 %143 %144 %145 %146 %147 %148 %149 %150 %151 %152 %153 %154 %155 %156 %157 %158 %159 %160 %161 %162 %163 %164 %165 %166 %167 %168 %169 %170 %171 %172 %173 %174 %175 %176 %177 %178 %179 %180 %181 %182 %183 %184 %185 %186 %187 %188 %189 %190 %191 %192 %193 %194 %195 %196 %197 %198 %199 %200 %201 %202 %203 %204 %205 %206 %207 %208 %209 %210 %211 %212 %213 %214 %215 %216 %217 %218 %219 %220 %221 %222 %223 %224 %225 %226 %227 %228 %229 %230 %231 %232 %233 %234 %235 %236 %237 %238 %239 %240 %241 %242 %243 %244 %245 %246 %247 %248 %249 %250 %251 %252 %253 %254 %255 %256 %257 %258 %259 %260 %261 %262 %263 %264 %265 %266 %267 %268 %269 %270 %271 %272 %273 ",
      "args0": [
        {
          "type": "input_value",
          "name": "num_pattern_no",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "PLAY\n音楽を演奏します\n●MSXべーしっ君非対応",
      "message0": "●演奏 %1\n ch.A %2 %3\n ch.B %4 %5\n ch.C %6 %7",
      "args0": [
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_value",
          "name": "str_mml_a",
          "shadow": {
            "type": "text_input",
          }
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_value",
          "name": "str_mml_b",
          "shadow": {
            "type": "text_input",
          }
        },
        {
          "type": "input_dummy",
          "name": "NAME"
        },
        {
          "type": "input_value",
          "name": "str_mml_c",
          "shadow": {
            "type": "text_input",
          }
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
      "tooltip": "SOUND\nPSGのレジスタに値を書き込みます",
      "message0": "PSGのレジスタ %1 番に %2 を書き込む",
      "args0": [
        {
        "type": "input_value",
        "name": "num_channel",
        "shadow": {
          "type": "number_input",
        }
        },
        {
        "type": "input_value",
        "name": "num_param",
        "shadow": {
          "type": "number_input",
        }
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
      "tooltip": "BEEP\nスピーカーを鳴らします",
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
      "tooltip": "メイン処理\nメインプログラムをここに書きます\n（他言語のmain()相当）",
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
      "tooltip": "REM\nコメントのためのブロックです\n実行には影響しません",
      "message0": "注釈 %1",
      "args0": [
        {
          "type": "input_value",
          "name": "str_comment",
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
      "tooltip": "書いたそのままをMSX BASICのコードとして出力します",
      "message0": "即値 %1",
      "args0": [
        {
          "type": "input_value",
          "name": "str_do",
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
      "tooltip": "FOR...NEXT\n繰り返したいプログラムをここに書きます",
      "message0": "変数 %1 を %2 から %3 まで %4 刻みで繰り返す %5 %6 ⤴ %7",
      "args0": [
        {
          "type": "input_value",
          "name": "str_varable",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_start",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_dest",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_step",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "無限ループ\nずっと繰り返したいプログラムをここに書きます",
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
      "tooltip": "while\n条件が成り立つ間はずっと繰り返したいプログラムをここに書きます",
      "message0": "%1の間は繰り返す %2 %3 ⤴ %4",
      "args0": [
        {
          "type": "input_value",
          "name": "num_condition",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "IF...THEN\n条件が成り立つ時だけ実行したいプログラムをここに書きます",
      "message0": "もし %1 なら %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "num_condition",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "IF...THEN...ELSE\n条件が成り立つ時と成り立たない時それぞれに実行したいプログラムをここに書きます",
      "message0": "もし %1 なら %2 %3 でなければ %4 %5",
      "args0": [
        {
          "type": "input_value",
          "name": "num_condition",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "ON ERROR GOTO...RESUME\nエラー対策をしたいプログラムをここに書きます\n●MSXべーしっ君非対応",
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
      "tooltip": "END\nプログラムを終了します",
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
      "tooltip": 'RUN"filename"\n指定したプログラムファイルを実行します',
      "message0": "プログラム %1 に実行を引き継ぐ",
      "args0": [
        {
          "type": "input_value",
          "name": "str_filename",
          "shadow": {
            "type": "text_input",
          }
        }
      ],
      "previousStatement": null,
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
      "tooltip": "GOSUB...RETURN\nサブルーチンを作ります",
      "message0": "サブルーチン %1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "str_proc_name",
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
      "tooltip": "GOSUB\n作ったサブルーチンを呼び出します",
      "message0": "サブルーチン %1 を呼び出す",
      "args0": [
        {
          "type": "input_value",
          "name": "str_proc_name",
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
      "tooltip": "ON INTERVAL=n GOSUB\n一定のタイミングで実行したい割り込みプログラムをここに書きます",
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
      "tooltip": "ON INTERVAL=n GOSUB\n割り込みプログラムを実行するタイミングを設定します",
      "message0": "タイマ割り込みの間隔を %1 /60秒に設定する",
      "args0": [
        {
          "type": "input_value",
          "name": "num_interval",
          "shadow": {
            "type": "number_input",
          }
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
      "tooltip": "INTERVAL ON/OFF/STOP\n一定のタイミングで割り込みプログラムを実行するかどうか設定します",
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
      "tooltip": "ON SPRITE GOSUB\nスプライト同士が重なったときに実行したい割り込みプログラムをここに書きます",
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
      "tooltip": "SPRITE ON/OFF/STOP\nスプライト同士が重なったときに割り込みプログラムを実行するかどうか設定します",
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
      "tooltip": "ON STRIG GOSUB\nスペースキーが押されたときに実行したい割り込みプログラムをここに書きます",
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
      "tooltip": "STRIG(0) ON/OFF/STOP\nスペースキーが押されたときに割り込みプログラムを実行するかどうか設定します",
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
      "tooltip": "INPUT\nキーボードから入力されたデータを変数に代入します\n（?あり）",
      "message0": "%1 ？と聞いた結果を変数 %2 に入れる",
      "args0": [
        {
          "type": "input_value",
          "name": "str_prompt",
        },
        {
          "type": "input_value",
          "name": "str_result",
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
      "tooltip": "LINE INPUT\nキーボードから入力されたデータを変数に代入します\n（?なし）",
      "message0": "%1 と聞いた結果を変数 %2 に入れる",
      "args0": [
        {
          "type": "input_value",
          "name": "str_prompt",
        },
        {
          "type": "input_value",
          "name": "str_result",
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
      "tooltip": "INKEY$\n押されているキーがわかる\n（文字列）",
      "message0": "押されているキー",
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_inputdollar",
      "tooltip": "INPUT$(n)\n指定された文字数分の押されているキーがわかる\n（文字列）",
      "message0": "%1文字分押された結果",
      "args0": [
        {
          "type": "input_value",
          "name": "num_chrs",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_stick",
      "tooltip": "STICK(n)\nジョイスティックの押されている方向がわかる\n（数値）",
      "message0": "ジョイスティック %1 番の方向",
      "args0": [
        {
          "type": "input_value",
          "name": "num_stick",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_strig",
      "tooltip": "STRIG(n)\nトリガーボタンが押されているかがわかる\n（数値）",
      "message0": "トリガー %1 番の状態",
      "args0": [
        {
          "type": "input_value",
          "name": "num_strig",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_pad",
      "tooltip": "PAD(n)\nマウスの状態がわかる\n（数値）",
      "message0": "PAD%1の状態",
      "args0": [
        {
          "type": "input_value",
          "name": "num_port",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_pdl",
      "tooltip": "PDL(n)\nパドルの状態がわかる\n（数値）",
      "message0": "PDL%1の状態",
      "args0": [
        {
          "type": "input_value",
          "name": "num_port",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(191, 196,  7)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_time",
      "tooltip": "TIME\n1/60秒ごとに増えるタイマーの値がわかる\n（数値）",
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
    カテゴリ：計算
******************************************/
    {
      "type": "msx_deftype",
      "tooltip": "DENINT/SNG/DBL\n変数の型を宣言します",
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
      "tooltip": "DIM\n配列変数を定義します",
      "message0": "配列変数 %1 を定義する",
      "args0": [
        {
          "type": "input_value",
          "name": "str_var_array",
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
      "tooltip": "LET\n変数に値を代入します",
      "message0": "変数 %1 = %2",
      "args0": [
        {
          "type": "input_value",
          "name": "str_let_arg0",
        },
        {
          "type": "input_value",
          "name": "str_let_arg1",
          "shadow": {
            "type": "text_input",
          }
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
      "type": "msx_add",
      "tooltip": "足し算",
      "message0": "%1+%2",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_sub",
      "tooltip": "引き算",
      "message0": "%1-%2",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_mul",
      "tooltip": "掛け算",
      "message0": "%1×%2",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_div",
      "tooltip": "割り算",
      "message0": "%1÷%2",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_div_int",
      "tooltip": "整数の割り算",
      "message0": "整数で%1÷%2",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_mod",
      "tooltip": "MOD\n割り算の余り",
      "message0": "%1÷%2の余り",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_power",
      "tooltip": "a^b\naのb乗",
      "message0": "%1の%2乗",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_less_than",
      "tooltip": "＜ 未満\n≦ 以下",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "field_dropdown",
          "name": "str_mode",
          "options": [
            ["＜", "<"],
            ["≦", "<="]
          ]
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_equal",
      "tooltip": "= 等しい\n≠ 等しくない",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "field_dropdown",
          "name": "str_mode",
          "options": [
            ["=", "="],
            ["≠", "<>"]
          ]
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_greater_than",
      "tooltip": "＞ より大きい\n≧以上",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "field_dropdown",
          "name": "str_mode",
          "options": [
            ["＞", ">"],
            ["≧", ">="]
          ]
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_and",
      "tooltip": "AND\n両方がONのときだけON",
      "message0": "%1かつ%2",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_or",
      "tooltip": "OR\n片方だけでもONならON",
      "message0": "%1または%2 ",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_xor",
      "tooltip": "XOR\n違う時だけON",
      "message0": "%1と%2の排他的論理和",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg1",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_arg2",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_not",
      "tooltip": "NOT\nOFFのときはON",
      "message0": "%1ではない",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_math",
      "tooltip": "数学関数の値がわかる\n（数値）",
      "message0": "%1の%2",
      "args0": [
        {
          "type": "input_value",
          "name": "num_arg",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "field_dropdown",
          "name": "str_math",
          "options": [
            ["絶対値", "ABS"],
            ["atan", "ATN"],
            ["cos", "COS"],
            ["eのn乗", "EXP"],
            ["小数点以下を消す", "FIX"],
            ["整数", "INT"],
            ["自然対数", "LOG"],
            ["乱数", "RND"],
            ["符号", "SGN"],
            ["sin", "SIN"],
            ["平方根", "SQR"],
            ["tan", "TAN"]          
          ]
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_randomize",
      "tooltip": "r=RND(-TIME)\n乱数を使う前に一度だけ使用します",
      "message0": "乱数の初期化",
      "previousStatement": null,
      "nextStatement": null,
      "inputsInline": true,
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
    {
      "type": "msx_random",
      "tooltip": "RND\n範囲内の乱数がわかる\n（数値）\nMSX BASICのRNDをそのまま使いたい場合は数学関数を使います",
      "message0": "%1 から %2 までの乱数",
      "args0": [
        {
          "type": "input_value",
          "name": "num_min",
          "shadow": {
            "type": "number_input",
          }
        },
        {
          "type": "input_value",
          "name": "num_max",
          "shadow": {
            "type": "number_input",
          }
        }
      ],
      "output": "String",
      "colour": "rgb(146, 193,  52)",
      "helpUrl": ""
    }
    ,
/******************************************
    カテゴリ：文字列操作
******************************************/
{
  "type": "msx_nondec",
  "tooltip": "BIN$(n),OCT$(n),HEX$(n)\n数値nを他進数にした場合がわかる\n（文字列）",
  "message0": "数値%1の%2",
  "args0": [
    {
      "type": "input_value",
      "name": "num_arg",
      "shadow": {
        "type": "number_input",
      }
    },
    {
      "type": "field_dropdown",
      "name": "str_nondec",
      "options": [
        ["2進数", "BIN$"],
        ["8進数", "OCT$"],
        ["16進数", "HEX$"]          ]
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_chr",
  "tooltip": "CHR$(n)\n指定した文字コードnの文字がわかる\n（文字列）",
  "message0": "文字コードが%1の文字",
  "args0": [
    {
      "type": "input_value",
      "name": "num_arg",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_str",
  "tooltip": "STR$(n)\n数値nを文字列に変換した結果がわかる\n（文字列）",
  "message0": "数値%1を文字列に変換",
  "args0": [
    {
      "type": "input_value",
      "name": "num_arg",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_string",
  "tooltip": "STRING$(n,c$)\n文字c$を指定した数nだけつなげた結果がわかる\n（文字列）",
  "message0": "文字%1を%2個つなげる",
  "args0": [
    {
      "type": "input_value",
      "name": "str_char",
      "shadow": {
        "type": "text_input",
      }
    },
    {
      "type": "input_value",
      "name": "num_nums",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_space",
  "tooltip": "SPACE$(n)\nスペースを指定した数nだけつなげた結果がわかる\n（文字列）",
  "message0": "スペースを%1個つなげる",
  "args0": [
    {
      "type": "input_value",
      "name": "num_arg",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_right_left",
  "tooltip": "RIGHT$(s$,n),LEFT$(s$,n)\n文字列s$の右または左から指定した数nだけ取り出した結果がわかる\n（文字列）",
  "message0": "文字列%1の%2から%3文字",
  "args0": [
    {
      "type": "input_value",
      "name": "str_str",
      "shadow": {
        "type": "text_input",
      }
    },
    {
      "type": "field_dropdown",
      "name": "str_mode",
      "options": [
        ["右", "RIGHT$"],
        ["左", "LEFT$"]
      ]
    },
    {
      "type": "input_value",
      "name": "num_nums",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_mid_slice",
  "tooltip": "MID$(s$,n,m)\n文字列s$の指定した場所nから指定した文字数mを取り出した結果がわかる\n（文字列）",
  "message0": "文字列%1の%2文字目から%3文字",
  "args0": [
    {
      "type": "input_value",
      "name": "str_str",
      "shadow": {
        "type": "text_input",
      }
    },
    {
      "type": "input_value",
      "name": "num_index",
      "shadow": {
        "type": "number_input",
      }
    },
    {
      "type": "input_value",
      "name": "num_nums",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_mid_replace",
  "tooltip": "MID$(s$,n,m)=t$\n文字列s$のn文字目からm文字分をt$に置き換えた結果がわかる\n（文字列）",
  "message0": "文字列%1の%2文字目から%3文字を%4にする",
  "args0": [

    {
      "type": "input_value",
      "name": "str_target",
      "shadow": {
        "type": "text_input",
      }
    },
    {
      "type": "input_value",
      "name": "num_index",
      "shadow": {
        "type": "number_input",
      }
    },
    {
      "type": "input_value",
      "name": "num_nums",
      "shadow": {
        "type": "number_input",
      }
    },
    {
      "type": "input_value",
      "name": "str_replace",
      "shadow": {
        "type": "text_input",
      }
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_asc",
  "tooltip": "ASC(c$)\n文字c$の文字コードがわかる\n（数値）",
  "message0": "文字%1の文字コード",
  "args0": [
    {
      "type": "input_value",
      "name": "str_chr",
      "shadow": {
        "type": "text_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_len",
  "tooltip": "LEN(s$)\n文字列s$の長さがわかる\n（数値）",
  "message0": "文字列%1の長さ",
  "args0": [
    {
      "type": "input_value",
      "name": "str_text",
      "shadow": {
        "type": "text_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_val",
  "tooltip": "VAL(s$)\n文字列s$を数値に変換した結果がわかる\n（数値）",
  "message0": "文字列%1を数値に変換",
  "args0": [
    {
      "type": "input_value",
      "name": "str_text",
      "shadow": {
        "type": "text_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
{
  "type": "msx_instr",
  "tooltip": "INSTR(s$,t$)\n文字列s$から文字列t$を探した結果がわかる\n（数値）",
  "message0": "文字列%1のうち文字列%2の場所",
  "args0": [
    {
      "type": "input_value",
      "name": "str_target",
      "shadow": {
        "type": "text_input",
      }
    },
    {
      "type": "input_value",
      "name": "str_search",
      "shadow": {
        "type": "text_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(80, 200, 120)",
  "helpUrl": ""
}
,
/******************************************
    カテゴリ：高度な操作
******************************************/
{
  "type": "msx_peek",
  "tooltip": "PEEK(n)\nメモリのn番地の内容がわかる\n（数値）",
  "message0": "メモリの%1番地の値",
  "args0": [
    {
      "type": "input_value",
      "name": "num_addr",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "colour": "rgb(250, 100, 100)",
  "helpUrl": ""
}
,
{
  "type": "msx_poke",
  "tooltip": "POKE m,n\nメモリのm番地にnを書き込む",
  "message0": "メモリの%1番地に%2を書き込む",
  "args0": [
    {
      "type": "input_value",
      "name": "num_addr",
      "shadow": {
        "type": "number_input",
      }
    },
    {
      "type": "input_value",
      "name": "num_data",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "inputsInline": true,
  "colour": "rgb(250, 100, 100)",
  "helpUrl": ""
}
,
{
  "type": "msx_inp",
  "tooltip": "INP(n)\n入力ポートのポート番号nの値がわかる\n（数値）",
  "message0": "I/Oポートの%1番の値",
  "args0": [
    {
      "type": "input_value",
      "name": "num_port",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "colour": "rgb(250, 100, 100)",
  "helpUrl": ""
}
,
{
  "type": "msx_out",
  "tooltip": "OUT n,m\n出力ポートのポート番号nにmを送る",
  "message0": "I/Oポートの%1番に%2を送る",
  "args0": [
    {
      "type": "input_value",
      "name": "num_port",
      "shadow": {
        "type": "number_input",
      }
    },
    {
      "type": "input_value",
      "name": "num_data",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "inputsInline": true,
  "colour": "rgb(250, 100, 100)",
  "helpUrl": ""
}
,
{
  "type": "msx_def_usr",
  "tooltip": "DEF USRn=m\n機械語プログラムn番のアドレスをm番地に設定する",
  "message0": "機械語プログラム%1番のアドレスを%2番地に設定する",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "str_number",
      "options": [
        ["0", "0"],
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"],
        ["9", "9"] 
      ]
    },
    {
      "type": "input_value",
      "name": "num_addr",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "inputsInline": true,
  "colour": "rgb(250, 100, 100)",
  "helpUrl": ""
}
,
{
  "type": "msx_usr",
  "tooltip": "USRn(m)\n機械語プログラムn番に引数mを与えて実行した結果がわかる\n（数値）",
  "message0": "機械語プログラム%1番に引数%2を与えて実行する",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "str_number",
      "options": [
        ["0", "0"],
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"],
        ["9", "9"] 
      ]
    },
    {
      "type": "input_value",
      "name": "num_arg",
      "shadow": {
        "type": "number_input",
      }
    }
  ],
  "output": "String",
  "inputsInline": true,
  "colour": "rgb(250, 100, 100)",
  "helpUrl": ""
}
,
/******************************************
    カテゴリ：定数入力用フィールド
******************************************/
    //Grok 3 数値入力用ブロック
    {
      "type": "number_input",
      "message0": "%1",
      "args0": [
        { "type": "field_input", "name": "NUM", "text": "0" }
      ],
      "output": "Number",
      "colour": 160,
      "tooltip": "定数を入力"
    }
    ,
    // テキストフィールドだけのブロック
    {
      "type": "text_input",
      "message0": "%1",
      "args0": [
        { "type": "field_input", "name": "TEXT", "text": "" }
      ],
      "output": "String",
      "colour": 160,
      "tooltip": "文字列を入力"
    }
  ]
);

/*
 ToDo:  シャドウブロックへの変更：

(1) msx-block-def.js 
(1.1) ブロックの定義
(1.1.1)
"type": "field_input"
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        "type": "input_value",

(1.1.2)
"text": "15",	を上書き（無効なので消す）
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      【数値の場合】
        "shadow": {
          "type": "number_input",
        }
      【文字列の場合】
        "shadow": {
          "type": "text_input",
        }

(1.1.3)以下1行を追加(これをしないと引数ごとに改行されてしまう)
      "inputsInline": true,

(1.2) コード生成関数
  const num_x = generator.valueToCode(block, 'num_x', generator.ORDER_ATOMIC) || '0';
  const num_y = generator.valueToCode(block, 'num_y', generator.ORDER_ATOMIC) || '0';  

(2) msx-block-gen.js (ツールボックスの定義)

const toolbox に こんな感じで指定。デフォルト値はここでのみ指定
      【数値の場合】
      <block type="msx_locate">
        <value name="num_x">
          <shadow type="number_input">
            <field name="NUM">15</field>
          </shadow>
        </value>
        <value name="num_y">
          <shadow type="number_input">
            <field name="NUM">11</field>
          </shadow>
        </value>
      </block>

      【文字列の場合】
        <value name="str_y">
          <shadow type="text_input">
            <field name="TEXT">hoehoe</field>
          </shadow>
        </value>
*/



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
    カテゴリ：画面
******************************************/

// SCREEN
javascript.javascriptGenerator.forBlock['msx_screen'] = function(block, generator) {

  const num_screen_no = generator.valueToCode(block, 'num_screen_no', generator.ORDER_ATOMIC) || '0';

  const code = 'SCREEN ' + num_screen_no + '\n';

  return code;
};

// WIDTH
javascript.javascriptGenerator.forBlock['msx_width'] = function(block, generator) {

  const num_width = generator.valueToCode(block, 'num_width', generator.ORDER_ATOMIC) || '0';
  
  const code = 'WIDTH ' + num_width + '\n';

  return code;
};
  
// KEY ON/OFF
javascript.javascriptGenerator.forBlock['msx_key_view'] = function(block, generator)  {

  const str_key_view = block.getFieldValue('str_key_view');

  const code = 'KEY ' + str_key_view + '\n';

  return code;
};

// COLOR f,b,s
javascript.javascriptGenerator.forBlock['msx_color'] = function(block, generator) {

  const num_fore = generator.valueToCode(block, 'num_fore', generator.ORDER_ATOMIC) || '0';
  const num_back = generator.valueToCode(block, 'num_back', generator.ORDER_ATOMIC) || '0';
  const num_surr = generator.valueToCode(block, 'num_surr', generator.ORDER_ATOMIC) || '0';

  const code = `COLOR ${num_fore},${num_back},${num_surr}\n`;

  return code;
};

// CLS
javascript.javascriptGenerator.forBlock['msx_cls'] = function(block, generator)  {

  const code = 'CLS\n';
  return code;
};

// LOCATE
javascript.javascriptGenerator.forBlock['msx_locate'] = function(block, generator) {

  const num_x = generator.valueToCode(block, 'num_x', generator.ORDER_ATOMIC) || '0';
  const num_y = generator.valueToCode(block, 'num_y', generator.ORDER_ATOMIC) || '0';  

  const code = `LOCATE ${num_x},${num_y}\n`;

  return code;
};

// PRINT
javascript.javascriptGenerator.forBlock['msx_print'] = function(block, generator) {

  const str_text = generator.valueToCode(block, 'str_text', generator.ORDER_ATOMIC) || '0';
  
  const code = `PRINT ${str_text}\n`;

  return code;
};

// POS(0)（テキストカーソルのX座標）の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_pos'] = function(block) {

  const code = "POS(0)";

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// CSRLIN（テキストカーソルのY座標）の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_csrlin'] = function(block) {

  const code = "CSRLIN";

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

//COLOR=(c,r,g,b)
javascript.javascriptGenerator.forBlock['msx_palette'] = function(block, generator) {

  const num_paletteno = generator.valueToCode(block, 'num_paletteno', generator.ORDER_ATOMIC) || '0';
  const num_r = generator.valueToCode(block, 'num_r', generator.ORDER_ATOMIC) || '0';
  const num_g = generator.valueToCode(block, 'num_g', generator.ORDER_ATOMIC) || '0';
  const num_b = generator.valueToCode(block, 'num_b', generator.ORDER_ATOMIC) || '0';
  
  const code = `COLOR=(${num_paletteno},${num_r},${num_g},${num_b})\n`;

  return code;
};

// VDPの読み込み
javascript.javascriptGenerator.forBlock['msx_vdp_read'] = function(block, generator) {

  const num_reg = generator.valueToCode(block, 'num_reg', generator.ORDER_ATOMIC) || '0';
  
  const code = `VDP(${num_reg})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// VDPへの書き込み
javascript.javascriptGenerator.forBlock['msx_vdp_write'] = function(block, generator) {

  const num_reg = generator.valueToCode(block, 'num_reg', generator.ORDER_ATOMIC) || '0';
  const num_data = generator.valueToCode(block, 'num_data', generator.ORDER_ATOMIC) || '0';
  
  const code = `VDP(${num_reg})=${num_data}\n`;

  return code;
};

// VPEEK
javascript.javascriptGenerator.forBlock['msx_vpeek'] = function(block, generator) {
  
  const num_addr = generator.valueToCode(block, 'num_addr', generator.ORDER_ATOMIC) || '0';
  
  const code = "VPEEK(" + num_addr + ")";
  
  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// VPOKE
javascript.javascriptGenerator.forBlock['msx_vpoke'] = function(block, generator) {

  const num_addr = generator.valueToCode(block, 'num_addr', generator.ORDER_ATOMIC) || '0';
  const num_data = generator.valueToCode(block, 'num_data', generator.ORDER_ATOMIC) || '0';
  
  const code = `VPOKE ${num_addr},${num_data}\n`;

  return code;
};


/******************************************
    カテゴリ：グラフィックス
******************************************/

// SET PAGE n
javascript.javascriptGenerator.forBlock['msx_setpage_visible'] = function(block, generator) {

  const num_page = generator.valueToCode(block, 'num_page', generator.ORDER_ATOMIC) || '0';
  
  const code = 'SET PAGE ' + num_page + '\n';
  return code;
};

// SET PAGE ,n
javascript.javascriptGenerator.forBlock['msx_setpage_drawable'] = function(block, generator) {

  const num_page = generator.valueToCode(block, 'num_page', generator.ORDER_ATOMIC) || '0';
  
  const code = 'SET PAGE ,' + num_page + '\n';
  return code;
};

// LINE
javascript.javascriptGenerator.forBlock['msx_line'] = function(block, generator) {

  const num_x1 = generator.valueToCode(block, 'num_x1', generator.ORDER_ATOMIC) || '0';
  const num_y1 = generator.valueToCode(block, 'num_y1', generator.ORDER_ATOMIC) || '0';
  const num_x2 = generator.valueToCode(block, 'num_x2', generator.ORDER_ATOMIC) || '0';
  const num_y2 = generator.valueToCode(block, 'num_y2', generator.ORDER_ATOMIC) || '0';
  const num_c = generator.valueToCode(block, 'num_c', generator.ORDER_ATOMIC) || '0';

  const str_logi_op = block.getFieldValue('str_logi_op');

  const code = `LINE (${num_x1},${num_y1})-(${num_x2},${num_y2}),${num_c},,${str_logi_op}\n`;

  return code;
};

// LINE ,B/BF
javascript.javascriptGenerator.forBlock['msx_box'] = function(block, generator) {

  const num_x1 = generator.valueToCode(block, 'num_x1', generator.ORDER_ATOMIC) || '0';
  const num_y1 = generator.valueToCode(block, 'num_y1', generator.ORDER_ATOMIC) || '0';
  const num_x2 = generator.valueToCode(block, 'num_x2', generator.ORDER_ATOMIC) || '0';
  const num_y2 = generator.valueToCode(block, 'num_y2', generator.ORDER_ATOMIC) || '0';
  const num_c = generator.valueToCode(block, 'num_c', generator.ORDER_ATOMIC) || '0';

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

  const num_x = generator.valueToCode(block, 'num_x', generator.ORDER_ATOMIC) || '0';
  const num_y = generator.valueToCode(block, 'num_y', generator.ORDER_ATOMIC) || '0';  
  const num_r = generator.valueToCode(block, 'num_r', generator.ORDER_ATOMIC) || '0';
  const num_c = generator.valueToCode(block, 'num_c', generator.ORDER_ATOMIC) || '0';  
  
  const code = `CIRCLE (${num_x},${num_y}),${num_r},${num_c}\n`;

  return code;
};

// PSET
javascript.javascriptGenerator.forBlock['msx_pset'] = function(block, generator) {

  const num_x = generator.valueToCode(block, 'num_x', generator.ORDER_ATOMIC) || '0';
  const num_y = generator.valueToCode(block, 'num_y', generator.ORDER_ATOMIC) || '0';  
  const num_c = generator.valueToCode(block, 'num_c', generator.ORDER_ATOMIC) || '0';  

  const str_logi_op = block.getFieldValue('str_logi_op');
  
  const code = `PSET(${num_x},${num_y}),${num_c},${str_logi_op}\n`;

  return code;
};

// PAINT
javascript.javascriptGenerator.forBlock['msx_paint'] = function(block, generator) {

  const num_x = generator.valueToCode(block, 'num_x', generator.ORDER_ATOMIC) || '0';
  const num_y = generator.valueToCode(block, 'num_y', generator.ORDER_ATOMIC) || '0';  
  const num_paint_color = generator.valueToCode(block, 'num_paint_color', generator.ORDER_ATOMIC) || '0';  
  const num_border_color = generator.valueToCode(block, 'num_border_color', generator.ORDER_ATOMIC) || '0';  
  
  const code = `PAINT(${num_x},${num_y}),${num_paint_color},${num_border_color}\n`;

  return code;
};

// COPY(ページ指定・論理演算なし)
javascript.javascriptGenerator.forBlock['msx_copy'] = function(block, generator) {

  const num_sx1 = generator.valueToCode(block, 'num_sx1', generator.ORDER_ATOMIC) || '0';
  const num_sy1 = generator.valueToCode(block, 'num_sy1', generator.ORDER_ATOMIC) || '0';
  const num_sx2 = generator.valueToCode(block, 'num_sx2', generator.ORDER_ATOMIC) || '0';
  const num_sy2 = generator.valueToCode(block, 'num_sy2', generator.ORDER_ATOMIC) || '0';
  const num_dx1 = generator.valueToCode(block, 'num_dx1', generator.ORDER_ATOMIC) || '0';
  const num_dy1 = generator.valueToCode(block, 'num_dy1', generator.ORDER_ATOMIC) || '0';
  
  const code = `COPY(${num_sx1},${num_sy1})-(${num_sx2},${num_sy2}) TO (${num_dx1},${num_dy1})\n`;

  return code;
};

// COPY(ページ指定・論理演算あり)
javascript.javascriptGenerator.forBlock['msx_copyx'] = function(block, generator) {

  const num_src_page = generator.valueToCode(block, 'num_src_page', generator.ORDER_ATOMIC) || '0';
  const num_sx1 = generator.valueToCode(block, 'num_sx1', generator.ORDER_ATOMIC) || '0';
  const num_sy1 = generator.valueToCode(block, 'num_sy1', generator.ORDER_ATOMIC) || '0';
  const num_sx2 = generator.valueToCode(block, 'num_sx2', generator.ORDER_ATOMIC) || '0';
  const num_sy2 = generator.valueToCode(block, 'num_sy2', generator.ORDER_ATOMIC) || '0';
  const num_dest_page = generator.valueToCode(block, 'num_dest_page', generator.ORDER_ATOMIC) || '0';
  const num_dx1 = generator.valueToCode(block, 'num_dx1', generator.ORDER_ATOMIC) || '0';
  const num_dy1 = generator.valueToCode(block, 'num_dy1', generator.ORDER_ATOMIC) || '0';
  const str_logi_op = block.getFieldValue('str_logi_op');
  
  const code = `COPY(${num_sx1},${num_sy1})-(${num_sx2},${num_sy2}),${num_src_page} TO (${num_dx1},${num_dy1}),${num_dest_page},${str_logi_op}\n`;

  return code;
};

// POINT
javascript.javascriptGenerator.forBlock['msx_point'] = function(block, generator) {

  const num_x = generator.valueToCode(block, 'num_x', generator.ORDER_ATOMIC) || '0';
  const num_y = generator.valueToCode(block, 'num_y', generator.ORDER_ATOMIC) || '0';  
  
  const code = `POINT(${num_x},${num_y})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
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

  const num_priority = generator.valueToCode(block, 'num_priority', generator.ORDER_ATOMIC) || '0';  
  const num_x = generator.valueToCode(block, 'num_x', generator.ORDER_ATOMIC) || '0';
  const num_y = generator.valueToCode(block, 'num_y', generator.ORDER_ATOMIC) || '0';  
  const num_color = generator.valueToCode(block, 'num_color', generator.ORDER_ATOMIC) || '0';
  const num_pattern = generator.valueToCode(block, 'num_pattern', generator.ORDER_ATOMIC) || '0';  
  
  const code = `PUT SPRITE ${num_priority},(${num_x},${num_y}),${num_color},${num_pattern}\n`;

  return code;
};

// SPRITE$() 8x8
javascript.javascriptGenerator.forBlock['msx_sprite_pattern_8x8'] = function(block, generator) {

  const num_pattern_no = generator.valueToCode(block, 'num_pattern_no', generator.ORDER_ATOMIC) || '0';  

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
  
  const num_pattern_no = generator.valueToCode(block, 'num_pattern_no', generator.ORDER_ATOMIC) || '0';  

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

  const str_mml_a = generator.valueToCode(block, 'str_mml_a', generator.ORDER_ATOMIC) || '0';
  const str_mml_b = generator.valueToCode(block, 'str_mml_b', generator.ORDER_ATOMIC) || '0';
  const str_mml_c = generator.valueToCode(block, 'str_mml_c', generator.ORDER_ATOMIC) || '0';

  const code = `PLAY ${str_mml_a},${str_mml_b},${str_mml_c}\n`;

  return code;
};

// SOUND
javascript.javascriptGenerator.forBlock['msx_sound'] = function(block, generator)  {

  const num_channel = generator.valueToCode(block, 'num_channel', generator.ORDER_ATOMIC) || '0';
  const num_param = generator.valueToCode(block, 'num_param', generator.ORDER_ATOMIC) || '0';  

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

  const code = generator.valueToCode(block, 'str_do', generator.ORDER_ATOMIC) + '\n';

  return code;
};

// FOR..NEXT
javascript.javascriptGenerator.forBlock['msx_for'] = function(block, generator) {

  const str_varable = generator.valueToCode(block, 'str_varable', generator.ORDER_ATOMIC) || '';
  const num_start = generator.valueToCode(block, 'num_start', generator.ORDER_ATOMIC) || '0';
  const num_dest = generator.valueToCode(block, 'num_dest', generator.ORDER_ATOMIC) || '0';  
  const num_step = generator.valueToCode(block, 'num_step', generator.ORDER_ATOMIC) || '0';
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

  const num_condition = generator.valueToCode(block, 'num_condition', generator.ORDER_ATOMIC) || '0';
  const statement_do = generator.statementToCode(block, 'statement_do');

  LabelCount++;
  const code = `'while __while:${LabelCount}__\n  IF not(${num_condition}) THEN __endwhile-${LabelCount}__\n${statement_do}  GOTO __while-${LabelCount}__\n'end-while __endwhile:${LabelCount}__\n`;

  return code;
};

// ブロックIF(..THEN..)
javascript.javascriptGenerator.forBlock['msx_if_then'] = function(block, generator) {

  const num_condition = generator.valueToCode(block, 'num_condition', generator.ORDER_ATOMIC) || '0';
  const statement_then = generator.statementToCode(block, 'statement_then');

  LabelCount++;
  const code = `IF not(${num_condition}) THEN __endif-${LabelCount}__\n${statement_then}'end-if __endif:${LabelCount}__\n`;

  return code;
};

// ブロックIF(..THEN..ELSE..)
javascript.javascriptGenerator.forBlock['msx_if_else'] = function(block, generator) {

  const num_condition = generator.valueToCode(block, 'num_condition', generator.ORDER_ATOMIC) || '0';
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

  const str_filename = generator.valueToCode(block, 'str_filename', generator.ORDER_ATOMIC) + '';

  const code = 'RUN' + str_filename + '\n';

  return code;
};

/******************************************
    カテゴリ：ブロック定義
******************************************/

// GOSUB..RETURNを隠蔽したサブルーチンの定義
javascript.javascriptGenerator.forBlock['msx_subprocedure'] = function(block, generator) {

  const str_proc_name = generator.valueToCode(block, 'str_proc_name', generator.ORDER_ATOMIC) + '';
  const statement_sub = generator.statementToCode(block, 'statement_sub');

  LabelCount++;
  const code = `'subroutine __subproc:"${str_proc_name}"__\n${statement_sub}RETURN\n`;

  return code;
};

// GOSUB..RETURNを隠蔽したサブルーチンの呼出
javascript.javascriptGenerator.forBlock['msx_call_subproc'] = function(block, generator) {

  const str_proc_name = generator.valueToCode(block, 'str_proc_name', generator.ORDER_ATOMIC) + '';
  
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

  const num_interval = generator.valueToCode(block, 'num_interval', generator.ORDER_ATOMIC) || '0';
  
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

  const str_prompt = generator.valueToCode(block, 'str_prompt', generator.ORDER_ATOMIC) + '';
  const str_result = generator.valueToCode(block, 'str_result', generator.ORDER_ATOMIC) + '';

  const code = 'INPUT ' + str_prompt + ';' + str_result + '\n';

  return code;
};

// LINE INPUT
javascript.javascriptGenerator.forBlock['msx_lineinput'] = function(block, generator) {

  const str_prompt = generator.valueToCode(block, 'str_prompt', generator.ORDER_ATOMIC) + '';
  const str_result = generator.valueToCode(block, 'str_result', generator.ORDER_ATOMIC) + '';

  const code = 'LINE INPUT ' + str_prompt + ';' + str_result + '\n';

  return code;
};

// INKEY$の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_inkey'] = function(block) {

  const code = "INKEY$";

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// INPUT$()の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_inputdollar'] = function(block, generator) {

  const num_chrs = generator.valueToCode(block, 'num_chrs', generator.ORDER_ATOMIC) || '0';
  
  const code = "INPUT$(" + num_chrs +")";

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// STICK()の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_stick'] = function(block, generator) {
  
  const num_stick = generator.valueToCode(block, 'num_stick', generator.ORDER_ATOMIC) || '0';
  
  const code = "STICK(" + num_stick + ")";
  
  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// STRIG()の値を返すブロック
javascript.javascriptGenerator.forBlock['msx_strig'] = function(block, generator) {

  const num_strig = generator.valueToCode(block, 'num_strig', generator.ORDER_ATOMIC) || '0';
  
  const code = "STRIG(" + num_strig + ")";

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// PAD(n)
javascript.javascriptGenerator.forBlock['msx_pad'] = function(block, generator) {

  const num_port = generator.valueToCode(block, 'num_port', generator.ORDER_ATOMIC) || '0';
  
  const code = `PAD(${num_port})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// PDL(n)
javascript.javascriptGenerator.forBlock['msx_pdl'] = function(block, generator) {

  const num_port = generator.valueToCode(block, 'num_port', generator.ORDER_ATOMIC) || '0';
  
  const code = `PDL(${num_port})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};


// TIMEの値を返すブロック
javascript.javascriptGenerator.forBlock['msx_time'] = function(block) {

  const code = "TIME";

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// TIMEをゼロにする Scratchにあるので
javascript.javascriptGenerator.forBlock['msx_time_reset'] = function(block, generator) {

  const code = "TIME=0\n";

  return code;
};


/******************************************
    カテゴリ：変数(Blocklyの機能相当部分)
******************************************/

// Grok 3: 変数名を返す(例：X)
javascript.javascriptGenerator.forBlock['variables_get'] = function(block, generator) {
  const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
  return [varName, generator.ORDER_ATOMIC];
};

// Grok 3: 変数名への代入文を返す(例：X=15)
javascript.javascriptGenerator.forBlock['variables_set'] = function(block, generator) {
  const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
  const value = generator.valueToCode(block, 'VALUE', generator.ORDER_ASSIGNMENT) || '0';
  return `${varName}=${value}\n`;
};

// Grok 3: 「[変数]を[引数]増やす」ブロックのソースコード生成を上書きする
// （デフォルトだと a_ = (typeof a === 'number' ? a : 0) + 1; みたいなのを吐く）
javascript.javascriptGenerator.forBlock['math_change'] = function(block, generator) {
  const varName = generator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
  const delta = generator.valueToCode(block, 'DELTA', generator.ORDER_ADDITION) || '0';
  const code = `${varName}=${varName}+(${delta})\n`;
  return code;
};


/******************************************
    カテゴリ：計算(Blocklyでカバーできない部分)
******************************************/

// DEFINT/SNG/DBL A-Z
javascript.javascriptGenerator.forBlock['msx_deftype'] = function(block, generator)  {

  const str_deftype = block.getFieldValue('str_deftype');

  const code = 'DEF' + str_deftype + ' A-Z\n';

  return code;
};

// DIM
javascript.javascriptGenerator.forBlock['msx_dim'] = function(block, generator)  {

  const str_var_array = generator.valueToCode(block, 'str_var_array', generator.ORDER_ATOMIC) + '';

  const code = 'DIM ' + str_var_array + '\n';

  return code;
};

// LET
javascript.javascriptGenerator.forBlock['msx_let'] = function(block, generator)  {

  const str_let_arg0 = generator.valueToCode(block, 'str_let_arg0', generator.ORDER_ATOMIC) + '';
  const str_let_arg1 = generator.valueToCode(block, 'str_let_arg1', generator.ORDER_ATOMIC) + '';

  const code = str_let_arg0 + '=' + str_let_arg1 + '\n';

  return code;
};

// 足し算
javascript.javascriptGenerator.forBlock['msx_add'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1}+${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_ADDITION];
};

// 引き算
javascript.javascriptGenerator.forBlock['msx_sub'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1}-${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_ADDITION];
};

// 掛け算
javascript.javascriptGenerator.forBlock['msx_mul'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1}*${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_MULTIPLICATION];
};

// 割り算
javascript.javascriptGenerator.forBlock['msx_div'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1}/${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_MULTIPLICATION];
};

// 整数の割り算
javascript.javascriptGenerator.forBlock['msx_div_int'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1}\\${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_MULTIPLICATION];
};

// MOD
javascript.javascriptGenerator.forBlock['msx_mod'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1} MOD ${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_NONE]; //()がつく
};

// べき乗
javascript.javascriptGenerator.forBlock['msx_power'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1}^${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_NONE]; //()がつく
};

// より小さい
javascript.javascriptGenerator.forBlock['msx_less_than'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const str_mode =   block.getFieldValue('str_mode');
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
 
  const code = `${num_arg1}${str_mode}${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// 等しい
javascript.javascriptGenerator.forBlock['msx_equal'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const str_mode =   block.getFieldValue('str_mode');
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
 
  const code = `${num_arg1}${str_mode}${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// より大きい
javascript.javascriptGenerator.forBlock['msx_greater_than'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const str_mode =   block.getFieldValue('str_mode');
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
 
  const code = `${num_arg1}${str_mode}${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// AND
javascript.javascriptGenerator.forBlock['msx_and'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1} AND ${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_NONE]; //()がつく
};

// OR
javascript.javascriptGenerator.forBlock['msx_or'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1} OR ${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_NONE]; //()がつく
};

// XOR
javascript.javascriptGenerator.forBlock['msx_xor'] = function(block, generator) {

  const num_arg1 = generator.valueToCode(block, 'num_arg1', generator.ORDER_ATOMIC) || '0';
  const num_arg2 = generator.valueToCode(block, 'num_arg2', generator.ORDER_ATOMIC) || '0';  
  
  const code = `${num_arg1} XOR ${num_arg2}`;

  return [code, javascript.javascriptGenerator.ORDER_NONE]; //()がつく
};

// NOT
javascript.javascriptGenerator.forBlock['msx_not'] = function(block, generator) {

  const num_arg = generator.valueToCode(block, 'num_arg', generator.ORDER_ATOMIC) || '0';
  
  const code = `NOT(${num_arg})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// 数学関数
javascript.javascriptGenerator.forBlock['msx_math'] = function(block, generator) {

  const num_arg  = generator.valueToCode(block, 'num_arg', generator.ORDER_ATOMIC) || '0';
  const str_math = block.getFieldValue('str_math');
  
  const code = `${str_math}(${num_arg})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// RANDOMIZE(乱数の初期化)
javascript.javascriptGenerator.forBlock['msx_randomize'] = function(block, generator)  {

  const code = 'om!=RND(-TIME)\n';

  return code;
};

// 指定した整数の範囲内の値を返すブロック Scratchにあるので
javascript.javascriptGenerator.forBlock['msx_random'] = function(block, generator) {

  const num_min = generator.valueToCode(block, 'num_min', generator.ORDER_ATOMIC) || '0';
  const num_max = generator.valueToCode(block, 'num_max', generator.ORDER_ATOMIC) || '0';  
  
  const code = `INT(RND(1)*(${num_max}-${num_min}+1)+${num_min})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

/******************************************
    カテゴリ：文字列操作
******************************************/

// 他進数に変換 BIN$, OCT$, HEX$
javascript.javascriptGenerator.forBlock['msx_nondec'] = function(block, generator) {

  const num_arg  = generator.valueToCode(block, 'num_arg', generator.ORDER_ATOMIC) || '0';
  const str_nondec = block.getFieldValue('str_nondec');
  
  const code = `${str_nondec}(${num_arg})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// CHR$(n)
javascript.javascriptGenerator.forBlock['msx_chr'] = function(block, generator) {

  const num_arg  = generator.valueToCode(block, 'num_arg', generator.ORDER_ATOMIC) || '0';
  
  const code = `CHR$(${num_arg})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// STR$(n)
javascript.javascriptGenerator.forBlock['msx_str'] = function(block, generator) {

  const num_arg  = generator.valueToCode(block, 'num_arg', generator.ORDER_ATOMIC) || '0';
  
  const code = `STR$(${num_arg})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// STRING$(n,c)
javascript.javascriptGenerator.forBlock['msx_string'] = function(block, generator) {

  const str_char  = generator.valueToCode(block, 'str_char', generator.ORDER_ATOMIC) || '0';
  const num_nums  = generator.valueToCode(block, 'num_nums', generator.ORDER_ATOMIC) || '0';
  
  const code = `STRING$(${num_nums},${str_char})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// SPACE$(n)
javascript.javascriptGenerator.forBlock['msx_space'] = function(block, generator) {

  const num_arg  = generator.valueToCode(block, 'num_arg', generator.ORDER_ATOMIC) || '0';
  
  const code = `SPACE$(${num_arg})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// RIGHT$,LEFT$
javascript.javascriptGenerator.forBlock['msx_right_left'] = function(block, generator) {

  const str_str  = generator.valueToCode(block, 'str_str', generator.ORDER_ATOMIC) || '0';
  const str_mode = block.getFieldValue('str_mode');
  const num_nums = generator.valueToCode(block, 'num_nums', generator.ORDER_ATOMIC) || '0';
  
  const code = `${str_mode}(${str_str},${num_nums})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// MID$（文字列の取り出し）
javascript.javascriptGenerator.forBlock['msx_mid_slice'] = function(block, generator) {

  const str_str  = generator.valueToCode(block, 'str_str', generator.ORDER_ATOMIC) || '0';
  const num_index = generator.valueToCode(block, 'num_index', generator.ORDER_ATOMIC) || '0';
  const num_nums = generator.valueToCode(block, 'num_nums', generator.ORDER_ATOMIC) || '0';
  
  const code = `MID$(${str_str},${num_index},${num_nums})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// MID$（文字列の部分置換）
javascript.javascriptGenerator.forBlock['msx_mid_replace'] = function(block, generator) {

  const str_target  = generator.valueToCode(block, 'str_target', generator.ORDER_ATOMIC) || '0';
  const num_index = generator.valueToCode(block, 'num_index', generator.ORDER_ATOMIC) || '0';
  const num_nums = generator.valueToCode(block, 'num_nums', generator.ORDER_ATOMIC) || '0';
  const str_replace  = generator.valueToCode(block, 'str_replace', generator.ORDER_ATOMIC) || '0';
  
  const code = `MID$(${str_target},${num_index},${num_nums})=${str_replace}\n`;

  return code;
};

// ASC
javascript.javascriptGenerator.forBlock['msx_asc'] = function(block, generator) {

  const str_chr  = generator.valueToCode(block, 'str_chr', generator.ORDER_ATOMIC) || '0';
  
  const code = `ASC(${str_chr})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// LEN
javascript.javascriptGenerator.forBlock['msx_len'] = function(block, generator) {

  const str_text  = generator.valueToCode(block, 'str_text', generator.ORDER_ATOMIC) || '0';
  
  const code = `LEN(${str_text})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// VAL
javascript.javascriptGenerator.forBlock['msx_val'] = function(block, generator) {

  const str_text  = generator.valueToCode(block, 'str_text', generator.ORDER_ATOMIC) || '0';
  
  const code = `VAL(${str_text})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// INSTR
javascript.javascriptGenerator.forBlock['msx_instr'] = function(block, generator) {

  const str_target  = generator.valueToCode(block, 'str_target', generator.ORDER_ATOMIC) || '0';
  const str_search  = generator.valueToCode(block, 'str_search', generator.ORDER_ATOMIC) || '0';
  
  const code = `INSTR(${str_target},${str_search})`;

  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};


/******************************************
    カテゴリ：高度な操作
******************************************/

// PEEK
javascript.javascriptGenerator.forBlock['msx_peek'] = function(block, generator) {
  
  const num_addr = generator.valueToCode(block, 'num_addr', generator.ORDER_ATOMIC) || '0';
  
  const code = "PEEK(" + num_addr + ")";
  
  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// POKE
javascript.javascriptGenerator.forBlock['msx_poke'] = function(block, generator) {

  const num_addr = generator.valueToCode(block, 'num_addr', generator.ORDER_ATOMIC) || '0';
  const num_data = generator.valueToCode(block, 'num_data', generator.ORDER_ATOMIC) || '0';
  
  const code = `POKE ${num_addr},${num_data}\n`;

  return code;
};

// INP
javascript.javascriptGenerator.forBlock['msx_inp'] = function(block, generator) {
  
  const num_port = generator.valueToCode(block, 'num_port', generator.ORDER_ATOMIC) || '0';
  
  const code = "INP(" + num_port + ")";
  
  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// OUT
javascript.javascriptGenerator.forBlock['msx_out'] = function(block, generator) {

  const num_port = generator.valueToCode(block, 'num_port', generator.ORDER_ATOMIC) || '0';
  const num_data = generator.valueToCode(block, 'num_data', generator.ORDER_ATOMIC) || '0';
  
  const code = `OUT ${num_port},${num_data}\n`;

  return code;
};

// DEF USRn
javascript.javascriptGenerator.forBlock['msx_def_usr'] = function(block, generator) {

  const str_number = block.getFieldValue('str_number');
  const num_addr  = generator.valueToCode(block, 'num_addr', generator.ORDER_ATOMIC) || '0';
  
  const code = `DEF USR${str_number}=${num_addr}\n`;

  return code;
};

// USR(n)
javascript.javascriptGenerator.forBlock['msx_usr'] = function(block, generator) {
  
  const str_number = block.getFieldValue('str_number');
  const num_arg = generator.valueToCode(block, 'num_arg', generator.ORDER_ATOMIC) || '0';
  
  const code = `USR${str_number}(${num_arg})`;
  
  return [code, javascript.javascriptGenerator.ORDER_ATOMIC];
};


/******************************************
    カテゴリ：定数入力用フィールド
******************************************/

// Grok 3: 数値入力用ブロックのコード生成（javascript.javascriptGenerator）
javascript.javascriptGenerator.forBlock['number_input'] = function(block, generator) {
  const num = block.getFieldValue('NUM') || '0';
  return [num, generator.ORDER_ATOMIC];
};

// テキストフィールドだけのブロックのコード生成（javascript.javascriptGenerator）
javascript.javascriptGenerator.forBlock['text_input'] = function(block, generator) {
  const text = block.getFieldValue('TEXT') || '';
  return [text, generator.ORDER_ATOMIC];
};


