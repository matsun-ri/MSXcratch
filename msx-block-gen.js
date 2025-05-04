/**********************************************************************
    Blocklyを使ってMSX BASICのコードを作る
    ・ボタンイベントの処理
**********************************************************************/

//ブロックIFのジャンプ先 生成用
var LabelCount = 0;

//コードエリアのクイック保存・読込のためのキー
const BrowserSaveKey = 'MSXBlocklyStorage';

//ツールボックスの定義
const toolbox = `
  <xml>

    <category name="画面" colour="rgb(82, 151, 250)">
      <block type="msx_screen">
        <value name="num_screen_no">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_width">
        <value name="num_width">
          <shadow type="number_input">
            <field name="NUM">32</field>
          </shadow>
        </value>
      </block>
      <block type="msx_key_view"></block>
      <block type="msx_color">
        <value name="num_fore">
          <shadow type="number_input">
            <field name="NUM">15</field>
          </shadow>
        </value>
        <value name="num_back">
          <shadow type="number_input">
            <field name="NUM">4</field>
          </shadow>
        </value>
        <value name="num_surr">
          <shadow type="number_input">
            <field name="NUM">7</field>
          </shadow>
        </value>
      </block>
      <block type="msx_cls"></block>
      <block type="msx_locate">
        <value name="num_x">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="num_y">
          <shadow type="number_input">
            <field name="NUM">11</field>
          </shadow>
        </value>
      </block>
      <block type="msx_print">
        <value name="str_text">
          <shadow type="text_input">
            <field name="TEXT">"Hello, world."</field>
          </shadow>
        </value>
      </block>
      <block type="msx_pos"></block>
      <block type="msx_csrlin"></block>
      <block type="msx_palette">
        <value name="num_paletteno">
          <shadow type="number_input">
            <field name="NUM">15</field>
          </shadow>
        </value>
        <value name="num_r">
          <shadow type="number_input">
            <field name="NUM">7</field>
          </shadow>
        </value>
        <value name="num_g">
          <shadow type="number_input">
            <field name="NUM">6</field>
          </shadow>
        </value>
        <value name="num_b">
          <shadow type="number_input">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
      <block type="msx_vdp_read">
        <value name="num_reg">
          <shadow type="number_input">
            <field name="NUM">24</field>
          </shadow>
        </value>
      </block>
      <block type="msx_vdp_write">
        <value name="num_reg">
          <shadow type="number_input">
            <field name="NUM">24</field>
          </shadow>
        </value>
        <value name="num_data">
          <shadow type="number_input">
            <field name="NUM">96</field>
          </shadow>
        </value>
      </block>
      <block type="msx_vpeek">
        <value name="num_addr">
          <shadow type="number_input">
            <field name="NUM">&H1800</field>
          </shadow>
        </value>
      </block>
      <block type="msx_vpoke">
        <value name="num_addr">
          <shadow type="number_input">
            <field name="NUM">&H1800</field>
          </shadow>
        </value>
        <value name="num_data">
          <shadow type="number_input">
            <field name="NUM">65</field>
          </shadow>
        </value>
      </block>
    </category>

    <category name="グラフィックス" colour="rgb(127, 120, 222)">
      <block type="msx_setpage_visible">
        <value name="num_page">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="msx_setpage_drawable">
        <value name="num_page">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_line">
        <value name="num_x1">
          <shadow type="number_input">
            <field name="NUM">36</field>
          </shadow>
        </value>
        <value name="num_y1">
          <shadow type="number_input">
            <field name="NUM">18</field>
          </shadow>
        </value>
        <value name="num_x2">
          <shadow type="number_input">
            <field name="NUM">36</field>
          </shadow>
        </value>
        <value name="num_y2">
          <shadow type="number_input">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="num_c">
          <shadow type="number_input">
            <field name="NUM">14</field>
          </shadow>
        </value>
      </block>
      <block type="msx_box">
        <value name="num_x1">
          <shadow type="number_input">
            <field name="NUM">40</field>
          </shadow>
        </value>
        <value name="num_y1">
          <shadow type="number_input">
            <field name="NUM">20</field>
          </shadow>
        </value>
        <value name="num_x2">
          <shadow type="number_input">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="num_y2">
          <shadow type="number_input">
            <field name="NUM">60</field>
          </shadow>
        </value>
        <value name="num_c">
          <shadow type="number_input">
            <field name="NUM">15</field>
          </shadow>
        </value>
      </block>
      <block type="msx_circle">
        <value name="num_x">
          <shadow type="number_input">
            <field name="NUM">70</field>
          </shadow>
        </value>
        <value name="num_y">
          <shadow type="number_input">
            <field name="NUM">40</field>
          </shadow>
        </value>
        <value name="num_r">
          <shadow type="number_input">
            <field name="NUM">12</field>
          </shadow>
        </value>
        <value name="num_c">
          <shadow type="number_input">
            <field name="NUM">6</field>
          </shadow>
        </value>
      </block>
      <block type="msx_pset">
        <value name="num_x">
          <shadow type="number_input">
            <field name="NUM">36</field>
          </shadow>
        </value>
        <value name="num_y">
          <shadow type="number_input">
            <field name="NUM">15</field>
          </shadow>
        </value>
        <value name="num_c">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="msx_paint">
        <value name="num_x">
          <shadow type="number_input">
            <field name="NUM">70</field>
          </shadow>
        </value>
        <value name="num_y">
          <shadow type="number_input">
            <field name="NUM">40</field>
          </shadow>
        </value>
        <value name="num_paint_color">
          <shadow type="number_input">
            <field name="NUM">8</field>
          </shadow>
        </value>
        <value name="num_border_color">
          <shadow type="number_input">
            <field name="NUM">6</field>
          </shadow>
        </value>
      </block>
      <block type="msx_copy">
        <value name="num_sx1">
          <shadow type="number_input">
            <field name="NUM">30</field>
          </shadow>
        </value>
        <value name="num_sy1">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="num_sx2">
          <shadow type="number_input">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="num_sy2">
          <shadow type="number_input">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="num_dx1">
          <shadow type="number_input">
            <field name="NUM">150</field>
          </shadow>
        </value>
        <value name="num_dy1">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="msx_copyx">
        <value name="num_src_page">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="num_sx1">
          <shadow type="number_input">
            <field name="NUM">30</field>
          </shadow>
        </value>
        <value name="num_sy1">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="num_sx2">
          <shadow type="number_input">
            <field name="NUM">220</field>
          </shadow>
        </value>
        <value name="num_sy2">
          <shadow type="number_input">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="num_dest_page">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="num_dx1">
          <shadow type="number_input">
            <field name="NUM">30</field>
          </shadow>
        </value>
        <value name="num_dy1">
          <shadow type="number_input">
            <field name="NUM">110</field>
          </shadow>
        </value>
      </block>
      <block type="msx_point">
        <value name="num_x">
          <shadow type="number_input">
            <field name="NUM">127</field>
          </shadow>
        </value>
        <value name="num_y">
          <shadow type="number_input">
            <field name="NUM">95</field>
          </shadow>
        </value>
      </block>
    </category>

    <category name="スプライト" colour="rgb(149, 105, 209)">
      <block type="msx_sprite_size"></block>
      <block type="msx_put_sprite">
        <value name="num_priority">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="num_x">
          <shadow type="number_input">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="num_y">
          <shadow type="number_input">
            <field name="NUM">20</field>
          </shadow>
        </value>
        <value name="num_color">
          <shadow type="number_input">
            <field name="NUM">15</field>
          </shadow>
        </value>
        <value name="num_pattern">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="msx_sprite_pattern_8x8">
        <value name="num_pattern_no">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="msx_sprite_pattern_16x16">
        <value name="num_pattern_no">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
    </category>

    <category name="音" colour="rgb(222, 103, 184)">
      <block type="msx_play">
        <value name="str_mml_a">
          <shadow type="text_input">
            <field name="TEXT">"C"</field>
          </shadow>
        </value>
        <value name="str_mml_b">
          <shadow type="text_input">
            <field name="TEXT">"E"</field>
          </shadow>
        </value>
        <value name="str_mml_c">
          <shadow type="text_input">
            <field name="TEXT">"G"</field>
          </shadow>
        </value>
      </block>
      <block type="msx_sound">
        <value name="num_channel">
          <shadow type="number_input">
            <field name="NUM">8</field>
          </shadow>
        </value>
        <value name="num_param">
          <shadow type="number_input">
            <field name="NUM">12</field>
          </shadow>
        </value>
      </block>
      <block type="msx_beep"></block>
    </category>

    <category name="制御" colour="rgb(251, 173, 56)">
      <block type="msx_main"></block>
      <block type="msx_rem">
        <value name="str_comment">
          <shadow type="text_input">
            <field name="TEXT">コメント</field>
          </shadow>
        </value>
      </block>
      <block type="msx_eval">
        <value name="str_do">
          <shadow type="text_input">
            <field name="TEXT">CALL TURBO ON</field>
          </shadow>
        </value>
      </block>
      <block type="msx_for">
        <value name="str_varable">
          <shadow type="text_input">
            <field name="TEXT">i</field>
          </shadow>
        </value>
        <value name="num_start">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="num_dest">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="num_step">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_loop"></block>
      <block type="msx_while">
        <value name="num_condition">
          <shadow type="text_input">
            <field name="TEXT">a=1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_if_then">
        <value name="num_condition">
          <shadow type="text_input">
            <field name="TEXT">a=1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_if_else">
        <value name="num_condition">
          <shadow type="text_input">
            <field name="TEXT">a=1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_try_catch"></block>
      <block type="msx_end"></block>
      <block type="msx_run2file">
        <value name="str_filename">
          <shadow type="text_input">
            <field name="TEXT">"filename.bas"</field>
          </shadow>
        </value>
      </block>
    </category>

    <category name="ブロック定義" colour="rgb(250, 140,  93)">
      <block type="msx_subprocedure">
        <value name="str_proc_name">
          <shadow type="text_input">
            <field name="TEXT">ルーチン名</field>
          </shadow>
        </value>
      </block>
      <block type="msx_call_subproc">
        <value name="str_proc_name">
          <shadow type="text_input">
            <field name="TEXT">ルーチン名</field>
          </shadow>
        </value>
      </block>
      <block type="msx_on_interval"></block>
      <block type="msx_on_interval_set">
        <value name="num_interval">
          <shadow type="number_input">
            <field name="NUM">60</field>
          </shadow>
        </value>
      </block>
      <block type="msx_on_interval_enable"></block>
      <block type="msx_on_sprite"></block>
      <block type="msx_on_sprite_enable"></block>
      <block type="msx_on_strig"></block>
      <block type="msx_on_strig_enable"></block>
    </category>

    <category name="調べる" colour="rgb(191, 196,  7)">
      <block type="msx_input">
        <value name="str_prompt">
          <shadow type="text_input">
            <field name="TEXT">"How many"</field>
          </shadow>
        </value>
        <value name="str_result">
          <shadow type="text_input">
            <field name="TEXT">a</field>
          </shadow>
        </value>
      </block>
      <block type="msx_lineinput">
        <value name="str_prompt">
          <shadow type="text_input">
            <field name="TEXT">"Your name:"</field>
          </shadow>
        </value>
        <value name="str_result">
          <shadow type="text_input">
            <field name="TEXT">a$</field>
          </shadow>
        </value>
      </block>
      <block type="msx_inkey"></block>
      <block type="msx_inputdollar">
        <value name="num_chrs">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_stick">
        <value name="num_stick">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="msx_strig">
        <value name="num_strig">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="msx_pad">
        <value name="num_port">
          <shadow type="number_input">
            <field name="NUM">13</field>
          </shadow>
        </value>
      </block>
      <block type="msx_pdl">
        <value name="num_port">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_time"></block>
      <block type="msx_time_reset"></block>
    </category>

    <category name="計算" colour="rgb(146, 193,  52)">
      <block type="msx_deftype"></block>
      <block type="msx_dim">
        <value name="str_var_array">
          <shadow type="text_input">
            <field name="TEXT">ar(2,3)</field>
          </shadow>
        </value>
      </block>
      <block type="msx_let">
        <value name="str_let_arg0">
          <shadow type="text_input">
            <field name="TEXT">a</field>
          </shadow>
        </value>
        <value name="str_let_arg1">
          <shadow type="text_input">
            <field name="TEXT">1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_add">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">2</field>
          </shadow>
        </value>
      </block>
      <block type="msx_sub">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">2</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">3</field>
          </shadow>
        </value>
      </block>
      <block type="msx_mul">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">3</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">4</field>
          </shadow>
        </value>
      </block>
      <block type="msx_div">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">4</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
      <block type="msx_div_int">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">5</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">6</field>
          </shadow>
        </value>
      </block>
      <block type="msx_mod">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">7</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">4</field>
          </shadow>
        </value>
      </block>
      <block type="msx_power">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">3</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">2</field>
          </shadow>
        </value>
      </block>
      <block type="msx_less_than">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">2</field>
          </shadow>
        </value>
      </block>
      <block type="msx_equal">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">2</field>
          </shadow>
        </value>
      </block>
      <block type="msx_greater_than">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">2</field>
          </shadow>
        </value>
      </block>
      <block type="msx_and">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">a</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">b</field>
          </shadow>
        </value>
      </block>
      <block type="msx_or">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">a</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">b</field>
          </shadow>
        </value>
      </block>
      <block type="msx_xor">
        <value name="num_arg1">
          <shadow type="number_input">
            <field name="NUM">a</field>
          </shadow>
        </value>
        <value name="num_arg2">
          <shadow type="number_input">
            <field name="NUM">b</field>
          </shadow>
        </value>
      </block>
      <block type="msx_not">
        <value name="num_arg">
          <shadow type="number_input">
            <field name="NUM">a</field>
          </shadow>
        </value>
      </block>
      <block type="msx_math">
        <value name="num_arg">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_randomize">
      </block>
      <block type="msx_random">
        <value name="num_min">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="num_max">
          <shadow type="number_input">
            <field name="NUM">6</field>
          </shadow>
        </value>
      </block>
    </category>

    <category name="文字列操作" colour="rgb(80, 200, 120)">
      <block type="msx_nondec">
        <value name="num_arg">
          <shadow type="number_input">
            <field name="NUM">15</field>
          </shadow>
        </value>
      </block>
      <block type="msx_chr">
        <value name="num_arg">
          <shadow type="number_input">
            <field name="NUM">65</field>
          </shadow>
        </value>
      </block>
      <block type="msx_str">
        <value name="num_arg">
          <shadow type="number_input">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>
      <block type="msx_string">
        <value name="num_nums">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="str_char">
          <shadow type="text_input">
            <field name="TEXT">"a"</field>
          </shadow>
        </value>
      </block>
      <block type="msx_space">
        <value name="num_arg">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="msx_right_left">
        <value name="str_str">
          <shadow type="text_input">
            <field name="TEXT">a$</field>
          </shadow>
        </value>
        <value name="num_nums">
          <shadow type="number_input">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="msx_mid_slice">
        <value name="str_str">
          <shadow type="text_input">
            <field name="TEXT">"Hello, world."</field>
          </shadow>
        </value>
        <value name="num_index">
          <shadow type="number_input">
            <field name="NUM">8</field>
          </shadow>
        </value>
        <value name="num_nums">
          <shadow type="number_input">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
      <block type="msx_mid_replace">
        <value name="str_target">
          <shadow type="text_input">
            <field name="TEXT">a$</field>
          </shadow>
        </value>
        <value name="num_index">
          <shadow type="number_input">
            <field name="NUM">8</field>
          </shadow>
        </value>
        <value name="num_nums">
          <shadow type="number_input">
            <field name="NUM">5</field>
          </shadow>
        </value>
        <value name="str_replace">
          <shadow type="text_input">
            <field name="TEXT">"again"</field>
          </shadow>
        </value>
      </block>
      <block type="msx_asc">
        <value name="str_chr">
          <shadow type="text_input">
            <field name="TEXT">"A"</field>
          </shadow>
        </value>
      </block>
      <block type="msx_len">
        <value name="str_text">
          <shadow type="text_input">
            <field name="TEXT">"Hello, world."</field>
          </shadow>
        </value>
      </block>
      <block type="msx_val">
        <value name="str_text">
          <shadow type="text_input">
            <field name="TEXT">"100"</field>
          </shadow>
        </value>
      </block>
      <block type="msx_instr">
        <value name="str_target">
          <shadow type="text_input">
            <field name="TEXT">"Hello, world."</field>
          </shadow>
        </value>
        <value name="str_search">
          <shadow type="text_input">
            <field name="TEXT">"ll"</field>
          </shadow>
        </value>
      </block>
    </category>

    <category name="高度な操作" colour="rgb(250, 100, 100)">
      <block type="msx_peek">
        <value name="num_addr">
          <shadow type="number_input">
            <field name="NUM">&HF346</field>
          </shadow>
        </value>
      </block>
      <block type="msx_poke">
        <value name="num_addr">
          <shadow type="number_input">
            <field name="NUM">&HF346</field>
          </shadow>
        </value>
        <value name="num_data">
          <shadow type="number_input">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="msx_inp">
        <value name="num_port">
          <shadow type="number_input">
            <field name="NUM">&H41</field>
          </shadow>
        </value>
      </block>
      <block type="msx_out">
        <value name="num_port">
          <shadow type="number_input">
            <field name="NUM">&H41</field>
          </shadow>
        </value>
        <value name="num_data">
          <shadow type="number_input">
            <field name="NUM">154</field>
          </shadow>
        </value>
      </block>
      <block type="msx_def_usr">
        <value name="num_addr">
          <shadow type="number_input">
            <field name="NUM">&H00C0</field>
          </shadow>
        </value>
      </block>
      <block type="msx_usr">
        <value name="num_arg">
          <shadow type="number_input">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
    </category>
    
  </xml>
`;
/*
    <category name="画面" colour="rgb(104, 136, 236)">

    <category name="拡張用3" colour="rgb(180, 90, 220)"></category>

    <category name="実験" colour="rgb(96, 96, 96)">
      <block type="text_input"></block>
      <block type="subroutine_call">
        <value name="LABEL">
          <shadow type="text_input">
            <field name="TEXT">MOVE</field>
          </shadow>
        </value>
      </block>
    </category>
*/

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

console.log('javascriptGenerator:', javascript.javascriptGenerator);
console.log('nameDB_:', javascript.javascriptGenerator.nameDB_);

// Grok 3: 正規化をさせない(a$をa_にさせない)
// nameDB_ が初期化されるタイミング（Blockly.inject 後）にカスタマイズを適用するためこの場所に置く
/*
const originalGetName = javascript.javascriptGenerator.nameDB_.getName.bind(javascript.javascriptGenerator.nameDB_);
javascript.javascriptGenerator.nameDB_.getName = function(name, type) {
  if (type === Blockly.Names.NameType.VARIABLE && name.endsWith('$')) {
    return name.toUpperCase();
  }
  return originalGetName(name, type);
};
*/

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

