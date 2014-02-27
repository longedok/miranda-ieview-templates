/** 
 * @description A nizer for juick.com
 *
 * @return void
 */
function juickonizer(inpId){
    var jlink = "xmpp:juick@juick.com?message;body=";

    var msgNumRegEx = /\B((#\d+)(\/\d+)?)/igm;
    var nickRegEx = /\B(@[a-zA-Z0-9-.@_|]+)\b/gm;
    var nickRegEx2 = /\B@([a-zA-Z0-9-.@_|]+)\b/gm;
    var tagRegEx = /(\*\S+?)(?=<br>| \*)/igm;
    var youtubeRegEx = /<a.*?>(http:\/\/(?:www.)?youtube.com\/[a-zA-Z0-9?=&;#_]+)<\/a>/igm;
    var imageRegEx = /(<a[^<]*?>((?:http:\/\/)?(?:www\.)?[^\s]+?\/[^\s]+?(?:\.jpg|\.jpeg|\.gif|\.png))<\/a>)/igm;
    var avatarUrl = 'http://api.juick.com/avatar?uname={0}&size=32';

    // dirty hack with last '/> @'
    add_before(inpId, nickRegEx2, '<img class="avatar" src="'+avatarUrl.format('$1')+'" /> @');
    add(inpId, nickRegEx, '<a class="pm" href="' + jlink + 'PM%20$1%20">[pm]</a>');
    add(inpId, imageRegEx, '<br /><br /><img class="image" src="$2" /><br />');
    wrap(inpId, msgNumRegEx, '<a>', 'class="msgNum" href="' + jlink + '$1%20"');
    wrap(inpId, nickRegEx, '<a>', 'class="nick" href="' + jlink + '$1+"');
    wrap(inpId, tagRegEx, '<a>', 'class="tag" href="' + jlink + '$1"');

    var msgNumRegEx2 = /\B(((#\d+)(\/\d+)?)<\/a>)/igm;
    var msgNumControl = '(<a class="controls" title="Показать комментарии" href="' + jlink + '$3+">+</a>';
    msgNumControl += ' <a class="controls" title="Подписаться на комментарии" href="' + jlink + 'S%20$3">S</a>';
    msgNumControl += ' <a class="controls" title="Отписаться от комментариев" href="' + jlink + 'U%20$3">U</a>';
    msgNumControl += ' <a class="controls" title="Удалить запись" href="' + jlink + 'D%20$2">D</a>';
    msgNumControl += ' <a class="controls" title="Рекомендовать запись" href="' + jlink + '!%20$3">!</a>)';

    add(inpId, msgNumRegEx2, msgNumControl);
    
    document.getElementById(inpId).innerHTML += "<br><br>";
    document.getElementById(inpId).innerHTML += '<a class="controls"  title="Топ." href="' + jlink + '@top+">@</a> ';
    document.getElementById(inpId).innerHTML += '<a class="controls"  title="Показать вашу ленту." href="' + jlink + '#">#</a>';
    document.getElementById(inpId).innerHTML += ' <a class="controls" title="Показать последние 10 сообщений" href="' + jlink + '#+">#+</a> ';
}

/** 
 * @description A nizer for point.im
 *
 * @return void
 */
function pointizer(inpId){
    var pointlink = "xmpp:p@point.im?message;body=";
    // regexp for the post's ids   
    // example:
    // for a post id '#abcd/1' $1 match group would contain '#abcd/1' and $2 - '#abcd'
    var msgNumRegEx = /\B((#[a-z0-9]{3,})(\/\d+)?)/igm;
    var imageRegEx = /(<a[^<]*?>((?:http:\/\/)?(?:www\.)?[^\s]+?\/[^\s]+?(?:\.jpg|\.jpeg|\.gif|\.png))<\/a>)/igm;

    add(inpId, imageRegEx, '<br /><br /><img width="320" height="240" src="$2" /><br />');
    // wrap messages and comments numbers with xmpp links
    // when user clicks the link the message number goes into input box so user could write an answer to the message
    wrap(inpId, msgNumRegEx, '<a>', 'class="msgNum" href="' + pointlink + '$1%20"');

    // add commands for requesting post's comments, subscribing to a post, etc.
    var msgNumRegEx2 = /\B(((#[a-z]{3,})(\/\d+)?)<\/a>)/igm;
    // #123456+
    var msgNumControl = '(<a class="controls" title="Показать комментарии" href="' + pointlink + '$3+">+</a>';
    // S #123456
    msgNumControl += ' <a class="controls" title="Подписаться на комментарии" href="' + pointlink + 'S%20$3">S</a>';
    // U #123456
    msgNumControl += ' <a class="controls" title="Отписаться от комментариев" href="' + pointlink + 'U%20$3">U</a>';
    // D #123456
    msgNumControl += ' <a class="controls" title="Удалить запись" href="' + pointlink + 'D%20$2">D</a>';
    msgNumControl += ' <a class="controls" title="Рекомендовать запись" href="' + pointlink + '!%20$3">!</a>)';

    add(inpId, msgNumRegEx2, msgNumControl);
    
    // Add +10 and +20 at the end of each message
    document.getElementById(inpId).innerHTML += "<br><br>";
    document.getElementById(inpId).innerHTML += '<a class="controls"  title="Показать последние 10 сообщений" href="' + pointlink + '+10">+10</a>';
    document.getElementById(inpId).innerHTML += ' <a class="controls" title="Показать последние 20 сообщений" href="' + pointlink + '+20">+20</a> ';
}

/** 
 * @description A nizer for bnw.im
 *
 * @return void
 */
function bnwizer(inpId){
    var bnwlink = "xmpp:bnw@bnw.im?message;body=";
    // regexp for the post's ids   
    // example:
    // for a post id '#TQIW9E/6OF' $1 match group would contain '#TQIW9E/6OF' and $2 - '#TQIW9E'
    var msgNumRegEx = /((#[A-Z0-9]{6,})(\/[A-Z0-9]{3,})?)/igm
        
    wrap(inpId, msgNumRegEx, '<a>', 'class="msgNum" href="' + bnwlink + '$1%20"', '$1', '--- ');
    var msgNumRegEx2 = /(((#[A-Z0-9]{6,})(\/[A-Z0-9]{3,})?)<\/a>)/igm;
    // #123456+
    var msgNumControl = '(<a class="controls" title="Показать комментарии" href="' + bnwlink + '$3+">+</a>';
    // S #123456
    msgNumControl += ' <a class="controls" title="Подписаться на комментарии" href="' + bnwlink + 'S%20$3">S</a>';
    // U #123456
    msgNumControl += ' <a class="controls" title="Отписаться от комментариев" href="' + bnwlink + 'U%20$3">U</a>';
    // D #123456
    msgNumControl += ' <a class="controls" title="Удалить запись" href="' + bnwlink + 'D%20$2">D</a>';
    // ! #123456
    msgNumControl += ' <a class="controls" title="Рекомендовать запись" href="' + bnwlink + '!%20$3">!</a>)';

    add(inpId, msgNumRegEx2, msgNumControl);
    
    // Добавляем # и #+ в конец каждого сообщения
    document.getElementById(inpId).innerHTML += "<br><br>";
    document.getElementById(inpId).innerHTML += '<a class="controls"  title="Показать вашу ленту." href="' + bnwlink + '#">#</a>';
    document.getElementById(inpId).innerHTML += ' <a class="controls" title="Показать последние 10 сообщений" href="' + bnwlink + '#+">#+</a> ';
}
