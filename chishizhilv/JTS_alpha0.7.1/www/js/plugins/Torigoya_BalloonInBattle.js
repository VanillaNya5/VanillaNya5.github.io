/*---------------------------------------------------------------------------*
 * Torigoya_BalloonInBattle.js
 *---------------------------------------------------------------------------*
 * 2020/07/25 ru_shalm
 * http://torigoya.hatenadiary.jp/
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc 战斗气泡消息
 * @author ru_shalm 汉化：硕明云书
 *
 * @param --- Basic ---
 * @text ---基本设置---
 *
 * @param Balloon Window Image
 * @text 引出序号窗口图像
 * @desc Image of Balloon Window (default: Window)
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param --- Advanced ---
 * @text ---高级设置---
 *
 * @param Balloon Padding
 * @text 气泡填充
 * @desc Padding of Balloon Message (recommend: 8)
 * @default 8
 *
 * @param Balloon Font Size
 * @text 引出序号字体大小
 * @desc Font Size of Balloon Message (recommend: 16)
 * @default 16
 *
 * @param Balloon Text Padding
 * @text 引出序号文本填充
 * @desc 气球消息的文本填充 (recommend: 6)
 * @default 6
 *
 * @param Balloon Line Height
 * @text 引出序号线高度
 * @desc Line Height of Balloon Message (recommend: 20)
 * @default 20
 *
 * @param --- Secret（deprecated） ---
 * @text ---机密（已弃用）---
 *
 * @param Secret Disable Append To Field
 * @text 机密禁用附加到字段
 * @type select
 * @option ON
 * @option OFF
 * @default OFF
 *
 * @help
 * <此插件可在SideView模式下使用>
 * 向战斗中的玩家弹出消息气泡。
 *
 * <基本规则>
 *   <Speech/○○: 消息内容>
 *
 *<玩家/敌人备注>
<Speech/Start:开始决一胜负吧！>
<Speech/Start[1]: 这是一次有难度的挑战！>
<Speech/Skill: \1！>
<Speech/Item:\1! >
<Speech/Evasion: 躲避！>
<Speech/Damage: 啊>
<Speech/Dead: 不....>
<Speech/Dying:快不行了...>

 
 
 
 
 
 
 
 *   <Speech/Skill: 使用技能 \1！>
 *   <Speech/Skill[1]:文本内容 >    //[1]代表技能ID
 *
 *   <Speech/Item: \1>  //使用物品
 *   <Speech/Item[1]:文本内容> //[1]代表物品ID
 *
 *   <Speech/Damage: 文本>  //受到伤害
 *   <Speech/Miss: 没击中>   //没击中
 *   <Speech/Evasion: 闪避!> //闪避
 *   <Speech/MagicEvasion: 魔法规避>
 *   <Speech/Counter: Counter from enemy Message> //反击
 *   <Speech/Reflection: 反击>
 *   <Speech/Dead: 阵亡>
 *
 *   <Speech/Substitute: 替换>
 *   <Speech/Substitute[1]: Substitute for ID.1>
 *   <Speech/Protected: 受保护的>
 *   <Speech/Protected[1]: Substituted Message by ID.1>
 *
 *   <Speech/Recovery: 恢复>
 *   <Speech/Recovery[1]: Repairing by friend ID.1 Message>
 *
 *   <Speech/RecoveryByRival: 按竞争对手恢复>
 *   <Speech/RecoveryByRival[1]: Repairing by rival ID.1 Message>
 *
 *   <Speech/Start: 开局>
 *   <Speech/Start[1]: 敌群开局>
 *
 *   <Speech/Victory: 胜利>
 *   <Speech/Victory[1]: when Winning Message with Troop ID.1>
 *
 *   <SpeechBalloon/X: balloon position> //气泡位置
 *   <SpeechBalloon/Y: balloon position>
 *
 */

/*:ja
 * @plugindesc 戦闘中セリフ表示さん for MV
 * @author ru_shalm
 *
 * @param --- 基本設定 ---
 *
 * @param Balloon Window Image
 * @desc 吹き出しに使用するウィンドウ画像のファイル名 (default: Window)
 * @default Window
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param --- 上級者設定 ---
 *
 * @param Balloon Padding
 * @type number
 * @desc 吹き出しの余白のサイズ (推奨: 8)
 * @default 8
 *
 * @param Balloon Font Size
 * @type number
 * @desc 吹き出しの文字サイズ (推奨: 16)
 * @default 16
 *
 * @param Balloon Text Padding
 * @type number
 * @desc 吹き出しのテキスト両端の余白 (推奨: 6)
 * @default 6
 *
 * @param Balloon Line Height
 * @type number
 * @desc 吹き出しの1行あたりの高さ。文字サイズよりちょっと大きめがよいです。 (推奨: 20)
 * @default 20
 *
 * @param --- ひみつ設定（非推奨） ---
 *
 * @param Secret Disable Append To Field
 * @type select
 * @desc 画面の色調変更の影響を受けなくなりますが、ONにするとYEP_BattleEngineCoreで動かなくなります
 * @option ON
 * @option OFF
 * @default OFF
 *
 * @help
 * 【このプラグインはサイドビュー戦闘でのみ使用できます】
 *
 * 戦闘中にセリフを吹き出しでキャラクターの上に表示します。
 * 表示したいアクター/エネミーのメモ欄に指定の記法で
 * メッセージを書いてください。
 *
 * ------------------------------------------------------------
 * ■ 基本ルール
 * ------------------------------------------------------------
 * <Speech/○○:デフォルトのメッセージ>
 * <Speech/○○[1]:○○のID:1番のメッセージ>
 * <Speech/○○[2]:メッセージ1, メッセージ2, メッセージ3>
 *
 * 上のような設定をメモ欄に記述します。
 * ○○の部分には表示したいタイミング（例: Skill）が入ります。
 * 複数の中からランダムに表示したい場合は半角カンマ( , )で区切ってください。
 *
 * 指定しなかった項目はセリフが表示されません。
 *
 * ------------------------------------------------------------
 * ■ 設定できる項目
 * ------------------------------------------------------------
 * <Speech/Skill: スキルを使ったときのメッセージ>
 * <Speech/Skill[1]: スキル1番を使ったときのメッセージ>
 *   \1 と書くとその部分がスキル名に置き換わります
 *
 * <Speech/Item: アイテムを使ったときのメッセージ>
 * <Speech/Item[1]: アイテム1番を使ったときのメッセージ>
 *   \1 と書くとその部分がスキル名に置き換わります
 *
 * <Speech/Damage: ダメージを受けたときのメッセージ>
 * <Speech/Miss: 敵のダメージがミスのときのメッセージ>
 * <Speech/Evasion: 敵の攻撃を回避したときのメッセージ>
 * <Speech/MagicEvasion: 敵の攻撃を回避したときのメッセージ>
 * <Speech/Counter: 敵の攻撃をカウンターしたときのメッセージ>
 * <Speech/Reflection: 敵の攻撃を反射したときのメッセージ>
 * <Speech/Dead: 戦闘不能になったときのメッセージ>
 *
 * <Speech/Substitute: 仲間の身代わりになったときのメッセージ>
 * <Speech/Substitute[1]: 仲間ID: 1番の身代わりになったときのメッセージ>
 * <Speech/Protected: 仲間が自分の身代りになったときのメッセージ>
 * <Speech/Protected[1]: 仲間ID: 1番が自分の身代わりになったときのメッセージ>
 *   \1 と書くとその部分が相手の名前に置き換わります。
 *   仲間IDは「アクターの場合：アクターID」、
 *   「敵キャラの場合：敵キャラID」になります。
 *
 * <Speech/Recovery: 仲間に回復してもらったときのメッセージ>
 * <Speech/Recovery[1]: 仲間ID: 1番に回復してもらったときのメッセージ>
 *   \1 と書くとその部分が回復してくれた人の名前に置き換わります。
 *   仲間IDは「アクターの場合：アクターID」、
 *   「敵キャラの場合：敵キャラID」になります。
 *
 * <Speech/RecoveryByRival: 対戦相手に回復してもらったときのメッセージ>
 * <Speech/RecoveryByRival[1]: 対戦相手ID: 1番に回復してもらったときのメッセージ>
 *   \1 と書くとその部分が回復してくれた人の名前に置き換わります
 *   対戦相手IDは「アクターの場合：敵キャラID」、
 *   「敵キャラの場合：アクターID」になります。
 *
 * <Speech/Start: 戦闘が始まったときのメッセージ>
 * <Speech/Start[1]: トループ1番との戦闘が始まったときのメッセージ>
 *
 * <Speech/Turn: そのキャラクターの行動選択中に表示するメッセージ>
 * <Speech/Turn[1]: トループ1番との戦闘時の行動選択中に表示するメッセージ>
 *   敵キャラの場合はプレイヤーが行動選択中は常に表示されるようになります。
 *
 * <Speech/Dying: そのキャラクターが瀕死中かつ行動選択中に表示するメッセージ>
 * <Speech/Dying[1]: 瀕死中かつトループ1番との戦闘時の行動選択中に表示するメッセージ>
 *   未設定の場合は <Speech/Turn> のセリフを表示します。
 *
 * <Speech/Victory: 戦闘勝利時のメッセージ>
 * <Speech/Victory[1]: トループ1番との戦闘勝利時のメッセージ>
 *
 * <SpeechBalloon/X: 吹き出し表示位置のX座標>
 * <SpeechBalloon/Y: 吹き出し表示位置のY座標>
 *   キャラクターのサイズによって吹き出しの位置が都合悪い場合は、
 *   アクター/エネミーごとに微調整できます。
 *
 * ------------------------------------------------------------
 * ■ コピペ用サンプル
 * ------------------------------------------------------------
 * 以下をメモ欄にコピペすると雰囲気を楽しめます
 *
 * <Speech/Skill: いくぞ、\1！>
 * <Speech/Skill[1]: くらえ！,はっ！>
 * <Speech/Skill[2]: 耐える！>
 * <Speech/Item: これを使う！>
 * <Speech/Damage: くそっ>
 * <Speech/Miss: この程度！>
 * <Speech/Dead: 守れなかった…ッ>
 * <Speech/Recovery: ありがとう>
 * <Speech/Start: 全力で行く！>
 * <Speech/Turn: ケリをつける！, ここが勝機だ>
 * <Speech/Victory: この調子でいこう！>
 * <Speech/Substitute: させるか！>
 * <Speech/Protected: すまない！>
 */

(function (global) {
    "use strict";

    var settings = PluginManager.parameters('Torigoya_BalloonInBattle');
    settings['Balloon Window Image'] = String(settings['Balloon Window Image'] || 'Window');
    settings['Balloon Padding'] = Number(settings['Balloon Padding'] || 8);
    settings['Balloon Font Size'] = Number(settings['Balloon Font Size'] || 16);
    settings['Balloon Text Padding'] = Number(settings['Balloon Text Padding'] || 6);
    settings['Balloon Line Height'] = Number(settings['Balloon Line Height'] || 20);
    settings['Secret Disable Append To Field'] = String(settings['Secret Disable Append To Field']) === 'ON';

    /**
     * 競合プラグインのチェック
     */
    var conflictPlugins = {
        YanflyBattleCore: (global.Yanfly && global.Yanfly.BEC),
        TMBattleCommandEx_omitPartyCommand: (function () {
            if (!global.Imported || !global.Imported.TMBattleCommandEx) return false;
            var params = PluginManager.parameters('TMBattleCommandEx');
            return String(params['omitPartyCommand']) === '1';
        })(),
        MOG_ConsecutiveBattles: (global.Imported && global.Imported.MOG_ConsecutiveBattles)
    };

    /**
     * オレオレCSVの読み取り
     * @param str
     * @returns {Array}
     */
    var splitMessage = function (str) {
        var result = [];
        var startPos = 0;
        for (var i = 0; i < str.length; ++i) {
            if (str[i] === ',' && str[i - 1] !== '\\') {
                result.push(str.substr(startPos, i - startPos));
                startPos = i + 1;
            }
        }
        result.push(str.substr(startPos, str.length - startPos));
        return result.map(function (n) {
            return n.replace(/\\,/g, ',').trim();
        });
    };

    /**
     * 生存 && 行動可能メンバーからランダムに1人選択
     * @returns {*}
     */
    var choiceAliveMember = function () {
        var members = $gameParty.battleMembers().filter(function (actor) {
            return actor.isAlive() && actor.canMove();
        });
        return members.length > 0 ? members[Math.randomInt(members.length)] : null;
    };

    /**
     * 生存 && 行動可能エネミーからランダムに1人選択
     * @returns {*}
     */
    var choiceAliveEnemy = function () {
        var members = $gameTroop.members().filter(function (enemy) {
            return enemy.isAlive() && enemy.canMove();
        });
        return members.length > 0 ? members[Math.randomInt(members.length)] : null;
    };

    /**
     * 全メンバーのセリフを削除
     */
    var clearSpeechOfAllMember = function () {
        clearSpeechOfAllActors();
        clearSpeechOfAllEnemies();
    };

    /**
     * 全アクターのセリフを削除
     */
    var clearSpeechOfAllActors = function () {
        $gameParty.allMembers().forEach(function (actor) {
            actor.torigoya_clearSpeech();
        });
    };

    /**
     * 全エネミーのセリフを削除
     */
    var clearSpeechOfAllEnemies = function () {
        $gameTroop.members().forEach(function (enemy) {
            enemy.torigoya_clearSpeech();
        });
    };

    /**
     * 全メンバーのセリフをちょっと待ってから削除
     */
    var delayClearSpeechOfAllMember = function (wait) {
        delayClearSpeechOfAllActors(wait);
        delayClearSpeechOfAllEnemies(wait);
    };

    /**
     * 全アクターのセリフをちょっと待ってから削除
     */
    var delayClearSpeechOfAllActors = function (wait) {
        $gameParty.allMembers().forEach(function (actor) {
            actor.torigoya_delayClearSpeech(wait);
        });
    };

    /**
     * 全エネミーのセリフをちょっと待ってから削除
     */
    var delayClearSpeechOfAllEnemies = function (wait) {
        $gameTroop.members().forEach(function (enemy) {
            enemy.torigoya_delayClearSpeech(wait);
        });
    };

    // 戦闘終了フラグ
    // ※YEP_VictoryAftermath等との互換のため
    var isBattleFinished = false;

    // -------------------------------------------------------------------------
    // 吹き出しウィンドウ
    // -------------------------------------------------------------------------
    var Window_Balloon = function () {
        this.initialize.apply(this, arguments);
        this.message = null;
    };
    Window_Balloon.prototype = Object.create(Window_Base.prototype);
    Window_Balloon.prototype.constructor = Window_Balloon;

    // for YEP_BattleEngineCore
    Object.defineProperties(Window_Balloon.prototype, {
        z: {
            enumerable: false,
            get: function () {
                return 9999;
            }
        }
    });

    Window_Balloon.prototype.standardFontSize = function () {
        return settings['Balloon Font Size'];
    };

    Window_Balloon.prototype.textPadding = function () {
        return settings['Balloon Text Padding'];
    };

    Window_Balloon.prototype.lineHeight = function () {
        return settings['Balloon Line Height'];
    };

    Window_Balloon.prototype.standardPadding = function () {
        return settings['Balloon Padding'];
    };

    Window_Balloon.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem(settings['Balloon Window Image']);
    };

    /**
     * メッセージ内容の設定
     * @param message
     */
    Window_Balloon.prototype.setSpeech = function (message) {
        if (message == this.message) return;

        if (!message || message.length == 0) {
            this.message = null;
        } else {
            this.message = message;
        }
        this.refreshMessage();
    };

    /**
     * メッセージ内容の生成
     */
    Window_Balloon.prototype.refreshMessage = function () {
        if (this.message) {
            var self = this;
            var messages = this.message.split(/\\n/);

            var width = 64;
            var height = this.lineHeight() * messages.length;
            this.resetFontSettings();
            messages.forEach(function (message) {
                var t = self.textWidth(message) + self.textPadding() * 2;
                if (t > width) {
                    width = t;
                }
            });

            this.contents.resize(width, height);
            this.move(this.x, this.y, width + this.standardPadding() * 2, height + this.standardPadding() * 2);
            messages.forEach(function (message, i) {
                self.drawText(message, 0, i * self.lineHeight(), width, 'center');
            });

            this.open();
        } else {
            this.close();
            this.contents.clear();
        }
    };

    /**
     * 指定されたBattlerのスプライトの位置に合わせる
     * @param spriteBattler
     */
    Window_Balloon.prototype.track = function (spriteBattler) {
        var actorOrEnemy = spriteBattler._battler ? (spriteBattler._battler.actor || spriteBattler._battler.enemy).apply(spriteBattler._battler) : null;
        this.x = spriteBattler.x - (this._width / 2) +
            (actorOrEnemy ? (~~actorOrEnemy.meta['SpeechBalloon/X']) : 0);
        this.y = spriteBattler.y - (spriteBattler.torigoya_getBattleHeight() + this._height) +
            (actorOrEnemy ? (~~actorOrEnemy.meta['SpeechBalloon/Y']) : 0);
    };

    // -------------------------------------------------------------------------
    // Battlerに吹き出し用メッセージ領域を追加
    // -------------------------------------------------------------------------
    var upstream_Game_BattlerBase_initialize = Game_BattlerBase.prototype.initialize;
    Game_BattlerBase.prototype.initialize = function () {
        upstream_Game_BattlerBase_initialize.apply(this);
        this._torigoya_speech = null;
        this._torigoya_speechUniqueID = null;
    };

    /**
     * メッセージ内容の設定
     * @param message
     */
    Game_BattlerBase.prototype.torigoya_setSpeech = function (message) {
        this._torigoya_speech = message;
        this._torigoya_speechUniqueID = Math.random();
    };

    /**
     * メッセージ表示中か取得
     * @returns {Boolean}
     */
    Game_BattlerBase.prototype.torigoya_hasSpeech = function () {
        return !!this._torigoya_speech;
    };

    /**
     * メッセージ内容の取得
     * @returns {null|*}
     */
    Game_BattlerBase.prototype.torigoya_getSpeech = function () {
        return this._torigoya_speech;
    };

    /**
     * メッセージの消去
     */
    Game_BattlerBase.prototype.torigoya_clearSpeech = function () {
        this._torigoya_speech = null;
        this._torigoya_speechUniqueID = null;
    };

    /**
     * ちょっと待ってからメッセージの消去
     */
    Game_BattlerBase.prototype.torigoya_delayClearSpeech = function (wait) {
        var id = this._torigoya_speechUniqueID;
        if (!id) return;

        setTimeout(function () {
            if (id === this._torigoya_speechUniqueID) {
                this.torigoya_clearSpeech();
            }
        }.bind(this), wait);
    };

    /**
     * ちょっと待ってからメッセージ消去をキャンセルする
     */
    Game_BattlerBase.prototype.torigoya_cancelDelayClearSpeech = function () {
        this._torigoya_speechUniqueID = Math.random();
    };

    /**
     * 指定形式のセリフパターンの中からランダムに取得
     * @param type
     * @param id
     * @returns {*}
     */
    Game_BattlerBase.prototype.torigoya_pickSpeech = function (type, id, name) {
        if (id === undefined) {
            id = 0;
        }
        if (name === undefined) {
            name = '';
        }

        var battler = (this.actor || this.enemy).apply(this);
        var key = 'Speech/' + type;
        var patternString =
            battler.meta[key + '[' + id + ']'] ||
            (Number(id) < 0 ? battler.meta[key + '[-]'] : false) ||
            battler.meta[key];
        if (patternString === true) { // セリフ空欄の場合
            return '';
        } else if (patternString) {
            var array = splitMessage(patternString);
            if (array.length > 0) {
                return array[Math.randomInt(array.length)].replace('\\1', name);
            }
        }
        return null;
    };

    // -------------------------------------------------------------------------
    // Sprite_Battlerに吹き出しを追加
    // -------------------------------------------------------------------------
    var upstream_Sprite_Battler_initialize = Sprite_Battler.prototype.initialize;
    Sprite_Battler.prototype.initialize = function (battler) {
        upstream_Sprite_Battler_initialize.bind(this)(battler);
        this.torigoya_balloonWindow = new Window_Balloon(0, 0, 0, 0);
        this.torigoya_balloonWindow.close();
    };

    var upstream_Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function () {
        upstream_Sprite_Battler_update.bind(this)();
        this.torigoya_balloonWindow.setSpeech(this._battler ? this._battler.torigoya_getSpeech() : null);
        this.torigoya_balloonWindow.track(this);
    };

    /**
     * Battlerの高さを取得
     * @returns {Number}
     */
    Sprite_Battler.prototype.torigoya_getBattleHeight = function () {
        return this.bitmap ? this.bitmap.height : 0;
    };

    /**
     * Actorの高さを取得
     * @returns {Number}
     */
    Sprite_Actor.prototype.torigoya_getBattleHeight = function () {
        var bitmap = this._mainSprite.bitmap;
        return bitmap ? (bitmap.height / 6) : Sprite_Battler.prototype.torigoya_getBattleHeight.apply(this);
    };

    // -------------------------------------------------------------------------
    // Battlerの持つ吹き出しをSpritesetに追加
    // -------------------------------------------------------------------------

    // 競合対応
    var maybeOriginal_battlerSprites = (function () {
        if (conflictPlugins.YanflyBattleCore) {
            // アクターのspriteが返ってこなくなるので元の関数を使う
            return global.Yanfly.BEC.Spriteset_Battle_battlerSprites;
        } else {
            return Spriteset_Battle.prototype.battlerSprites;
        }
    })();

    Spriteset_Battle.prototype.torigoya_attachBalloonWindow = function () {
        maybeOriginal_battlerSprites.apply(this).forEach((function (battlerSprite) {
            // 画面の色調変更の暫定対応
            // battleFieldにappendしてしまうと影響を受けてしまうが、
            // カメラなどの対応ができないのでYEPプラグインなどでおかしくなってしまう…＞＜；
            if (settings['Secret Disable Append To Field']) {
                this.addChild(battlerSprite.torigoya_balloonWindow);
            } else {
                this._battleField.addChild(battlerSprite.torigoya_balloonWindow);
            }
        }).bind(this));
    };

    var upstream_Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function () {
        upstream_Spriteset_Battle_createLowerLayer.apply(this);
        this.torigoya_attachBalloonWindow();
    };

    if (conflictPlugins.MOG_ConsecutiveBattles) {
        var upstream_Spriteset_Battle_prepareConBatSprites = Spriteset_Battle.prototype.prepareConBatSprites;
        Spriteset_Battle.prototype.prepareConBatSprites = function() {
            upstream_Spriteset_Battle_prepareConBatSprites.apply(this);
            this.torigoya_attachBalloonWindow();
        };
    }

    // -------------------------------------------------------------------------
    // 吹き出し発生イベントの設定
    // -------------------------------------------------------------------------

    // 行動時
    var upstream_BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function () {
        clearSpeechOfAllMember();
        upstream_BattleManager_startAction.apply(this);
        var subject = this._subject;
        if (subject) {
            var action = subject.currentAction();
            var item = action.item();
            var speech = null;

            if (action.isSkill()) {
                speech = subject.torigoya_pickSpeech('Skill', item.id, item.name)
            } else if (action.isItem()) {
                speech = subject.torigoya_pickSpeech('Item', item.id, item.name)
            }
            subject.torigoya_setSpeech(speech);
        }
    };

    // 行動完了時（吹き出し削除）
    var upstream_BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function () {
        upstream_BattleManager_endAction.apply(this);
        clearSpeechOfAllMember();
    };

    // ステート解除・回復系
    // @note 自分で回復したのか他人が回復したのかを取るためにここでチェックする
    var upstream_Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
    Window_BattleLog.prototype.displayActionResults = function (subject, target) {
        upstream_Window_BattleLog_displayActionResults.apply(this, [subject, target]);

        var speech = null;
        if (target.result().used && subject !== target && target.canMove()) {
            // ステート解除
            if (target.result().isStatusAffected()) {
                target.result().removedStateObjects().forEach(function (state) {
                    if (speech) return;
                    if (subject.isEnemy() === target.isEnemy()) { // 味方同士 or 敵同士
                        speech = target.torigoya_pickSpeech('RemoveState_' + state.id, subjectID, subject.name());
                    } else {
                        speech = target.torigoya_pickSpeech('RemoveStateByRival_' + state.id, subjectID, subject.name());
                    }
                });
            }

            // 回復系
            if (!speech && (target.result().hpDamage < 0 || target.result().mpDamage < 0 || target.result().tpDamage < 0)) {
                var subjectID = subject.isActor() ? subject.actorId() : subject.enemyId();
                if (subject.isEnemy() === target.isEnemy()) { // 味方同士 or 敵同士
                    speech = target.torigoya_pickSpeech('Recovery', subjectID, subject.name());
                } else {
                    speech = target.torigoya_pickSpeech('RecoveryByRival', subjectID, subject.name());
                }
            }
        }

        if (speech) {
            target.torigoya_setSpeech(speech);
        }
    };

    // 身代わり
    var upstream_BattleManager_applySubstitute = BattleManager.applySubstitute;
    BattleManager.applySubstitute = function (target) {
        var realTarget = upstream_BattleManager_applySubstitute.apply(this, arguments);
        if (target !== realTarget) {
            var targetID = target.isActor() ? target.actorId() : target.enemyId();
            var realTargetID = realTarget.isActor() ? realTarget.actorId() : realTarget.enemyId();
            realTarget.torigoya_setSpeech(realTarget.torigoya_pickSpeech('Substitute', targetID, target.name()));
            target.torigoya_setSpeech(target.torigoya_pickSpeech('Protected', realTargetID, realTarget.name()));
        }
        return realTarget;
    };

    // 相手の情報とかいらない系は↓の方法で

    // 被ダメージ時
    var upstream_Game_Battler_performDamage = Game_Battler.prototype.performDamage;
    Game_Battler.prototype.performDamage = function () {
        upstream_Game_Battler_performDamage.apply(this);
        if (this.canMove() && !this.torigoya_hasSpeech()) {
            this.torigoya_setSpeech(this.torigoya_pickSpeech('Damage'));
        }
    };

    // MISS時
    var upstream_Game_Battler_performMiss = Game_Battler.prototype.performMiss;
    Game_Battler.prototype.performMiss = function () {
        upstream_Game_Battler_performMiss.apply(this);
        if (this.canMove()) {
            this.torigoya_setSpeech(this.torigoya_pickSpeech('Miss'));
        }
    };

    // 回避時
    // @note 未指定時はMISSと一緒
    var upstream_Game_Battler_performEvasion = Game_Battler.prototype.performEvasion;
    Game_Battler.prototype.performEvasion = function () {
        upstream_Game_Battler_performEvasion.apply(this);
        if (this.canMove()) {
            this.torigoya_setSpeech(this.torigoya_pickSpeech('Evasion') || this.torigoya_pickSpeech('Miss'));
        }
    };

    // 魔法回避時
    // @note 未指定時は回避 or MISSと一緒
    var upstream_Game_Battler_performMagicEvasion = Game_Battler.prototype.performMagicEvasion;
    Game_Battler.prototype.performMagicEvasion = function () {
        upstream_Game_Battler_performMagicEvasion.apply(this);
        if (this.canMove()) {
            this.torigoya_setSpeech(this.torigoya_pickSpeech('MagicEvasion') || this.torigoya_pickSpeech('Evasion') || this.torigoya_pickSpeech('Miss'));
        }
    };

    // カウンター時
    var upstream_Game_Battler_performCounter = Game_Battler.prototype.performCounter;
    Game_Battler.prototype.performCounter = function () {
        upstream_Game_Battler_performCounter.apply(this);
        if (this.canMove()) {
            this.torigoya_setSpeech(this.torigoya_pickSpeech('Counter'));
        }
    };

    // 反射時
    var upstream_Game_Battler_performReflection = Game_Battler.prototype.performReflection;
    Game_Battler.prototype.performReflection = function () {
        upstream_Game_Battler_performReflection.apply(this);
        if (this.canMove()) {
            this.torigoya_setSpeech(this.torigoya_pickSpeech('Reflection'));
        }
    };

    // 戦闘不能時
    var upstream_Game_Battler_performCollapse = Game_Battler.prototype.performCollapse;
    Game_Battler.prototype.performCollapse = function () {
        upstream_Game_Battler_performCollapse.apply(this);
        this.torigoya_setSpeech(this.torigoya_pickSpeech('Dead'));
    };

    // 戦闘開始時
    var upstream_BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function () {
        isBattleFinished = false;
        clearSpeechOfAllMember();
        upstream_BattleManager_startBattle.apply(this);

        // 味方
        var member = choiceAliveMember();
        if (member) {
            member.torigoya_setSpeech(member.torigoya_pickSpeech('Start', $gameTroop._troopId));
        }

        // 敵
        $gameTroop.members().forEach(function (enemy) {
            if (enemy.isAlive()) {
                enemy.torigoya_setSpeech(enemy.torigoya_pickSpeech('Start', $gameTroop._troopId));
            }
        });
    };

    // パーティの行動選択開始時（吹き出し削除）
    var upstream_BattleManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function () {
        if (conflictPlugins.YanflyBattleCore) {
            delayClearSpeechOfAllMember(2500);
        } else {
            clearSpeechOfAllMember();
        }
        upstream_BattleManager_startInput.apply(this);
    };

    // アクターの行動選択時
    var upstream_BattleManager_changeActor = BattleManager.changeActor;
    BattleManager.changeActor = function (newActorIndex, lastActorActionState) {
        var member = this.actor();
        if (member) {
            if (conflictPlugins.TMBattleCommandEx_omitPartyCommand) {
                // キャンセル連打で先頭アクターが何度も喋るのを防止するため
                member.torigoya_delayClearSpeech(1);
            } else {
                member.torigoya_clearSpeech();
            }
        }

        upstream_BattleManager_changeActor.call(this, newActorIndex, lastActorActionState);

        member = this.actor();
        if (member) {
            if (conflictPlugins.YanflyBattleCore && member.torigoya_getSpeech()) {
                member.torigoya_cancelDelayClearSpeech();
            } else if (conflictPlugins.TMBattleCommandEx_omitPartyCommand && member.torigoya_getSpeech()) {
                member.torigoya_cancelDelayClearSpeech();
            } else {
                var speech = [
                    member.isDying() ? member.torigoya_pickSpeech('Dying', $gameTroop._troopId) : null,
                    member.torigoya_pickSpeech('Turn', $gameTroop._troopId)
                ].filter(Boolean)[0];
                if (speech) member.torigoya_setSpeech(speech);
            }
        }

        $gameTroop.members().forEach(function (enemy) {
            if (!enemy.isAlive()) return;

            if (enemy.torigoya_getSpeech()) {
                enemy.torigoya_cancelDelayClearSpeech();
                return;
            }

            var speech = [
                enemy.isDying() ? enemy.torigoya_pickSpeech('Dying', $gameTroop._troopId) : null,
                enemy.torigoya_pickSpeech('Turn', $gameTroop._troopId)
            ].filter(Boolean)[0];
            if (speech) enemy.torigoya_setSpeech(speech);
        });
    };

    // 戦闘終了時
    var upstream_BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function () {
        if (!isBattleFinished) {
            isBattleFinished = true;
            var member = choiceAliveMember();
            if (member) {
                member.torigoya_setSpeech(member.torigoya_pickSpeech('Victory', $gameTroop._troopId));
            }
        }
        upstream_BattleManager_processVictory.apply(this);
    };

    // 戦闘敗北
    var upstream_BattleManager_processDefeat = BattleManager.processDefeat;
    BattleManager.processDefeat = function() {
        if (!isBattleFinished) {
            isBattleFinished = true;
            var enemy = choiceAliveEnemy();
            if (enemy) {
                enemy.torigoya_setSpeech(enemy.torigoya_pickSpeech('Victory', $gameTroop._troopId));
            }
        }
        upstream_BattleManager_processDefeat.apply(this);
    };

    if (conflictPlugins.TMBattleCommandEx_omitPartyCommand) {
        // nothing to do
    } else if (conflictPlugins.YanflyBattleCore && Yanfly.BEC.Scene_Battle_startPartyCommandSelection) {
        var upstream_Yanfly_BEC_Scene_Battle_startPartyCommandSelection = Yanfly.BEC.Scene_Battle_startPartyCommandSelection;
        Yanfly.BEC.Scene_Battle_startPartyCommandSelection = function () {
            upstream_Yanfly_BEC_Scene_Battle_startPartyCommandSelection.apply(this);
            clearSpeechOfAllMember();
        }
    } else {
        var upstream_Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
        Scene_Battle.prototype.startPartyCommandSelection = function () {
            upstream_Scene_Battle_startPartyCommandSelection.apply(this);
            clearSpeechOfAllMember();
        }
    }

    // -------------------------------------------------------------------------

    var upstream_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if ($gameParty.inBattle()) {
            switch (command) {
                case 'BalloonBattle':
                case '戦闘中吹き出し': {
                    var target = parseTargetFromString((args[0] || '').trim());
                    var name = (args[1] || '').trim();
                    var id = parseIdFromString((args[2] || '').trim());
                    if (target) target.torigoya_setSpeech(target.torigoya_pickSpeech(name, id));
                    break;
                }
                case 'BalloonBattle:OFF':
                case '戦闘中吹き出し:OFF': {
                    var target = parseTargetFromString((args[0] || '').trim());
                    if (target) target.torigoya_clearSpeech();
                    break;
                }
            }
        }
        upstream_Game_Interpreter_pluginCommand.apply(this, arguments);
    };

    function parseTargetFromString(str) {
        var targetId = parseInt(str);
        if (targetId < 0) {
            var members = $gameTroop.members();
            return members[targetId];
        } else if (targetId > 0) {
            var members = $gameParty.battleMembers();
            for (var i = 0; i < members.length; ++i) {
                if (members[i].actorId() === targetId) return members[i];
            }
        }
        return null;
    }

    function parseIdFromString(str) {
        var id = parseInt(str);
        return isNaN(id) ? null : id;
    }

    // -------------------------------------------------------------------------
    global.Torigoya = (global.Torigoya || {});
    global.Torigoya.BalloonInBattle = {
        settings: settings,
        Window_Balloon: Window_Balloon,
        clearSpeechOfAllMember: clearSpeechOfAllMember
    };
})(this);
