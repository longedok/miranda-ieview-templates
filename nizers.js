/** 
 * @description A nizer for juick.com.
 *
 * @return void
 */
function juickonizer(inpId){
    var jlink = "xmpp:juick@juick.com?message;body=";
    // regexp для номеров сообщений. 
    // пример работы:
    // для номера #123456/1 в $1 - будет #123456/1, в $2 - #123456
    var msgNumRegEx = /\B((#\d+)(\/\d+)?)/igm;
    var nickRegEx = /\B(@[a-zA-Z0-9-.@_|]+)\b/gm;
    var tagRegEx = /(\*\S+?)(?=<br>| \*)/igm;
        
    wrap(inpId, tagRegEx, '<a>', 'class="tag" href="' + jlink + '$1"');
    // обoрачиваем номера постов/комментов ссылками
    wrap(inpId, msgNumRegEx, '<a>', 'class="msgNum" href="' + jlink + '$1%20"');
    // оборачиваем ники ссылками
    wrap(inpId, nickRegEx, '<a>', 'class="nick" href="' + jlink + '$1+"');
    // добавляем управление вставкой номеров постов/комментариев
    var msgNumRegEx2 = /\B(((#\d+)(\/\d+)?)<\/a>)/igm;
    // #123456+
    var msgNumControl = '(<a class="controls" title="Показать комментарии" href="' + jlink + '$3+">+</a>';
    // S #123456
    msgNumControl += ' <a class="controls" title="Подписаться на комментарии" href="' + jlink + 'S%20$3">S</a>';
    // U #123456
    msgNumControl += ' <a class="controls" title="Отписаться от комментариев" href="' + jlink + 'U%20$3">U</a>';
    // D #123456
    msgNumControl += ' <a class="controls" title="Удалить запись" href="' + jlink + 'D%20$2">D</a>';
    // ! #123456
    msgNumControl += ' <a class="controls" title="Рекомендовать запись" href="' + jlink + '!%20$3">!</a>)';

    add(inpId, msgNumRegEx2, msgNumControl);
    
    // Добавляем # и #+ в конец каждого сообщения
    document.getElementById(inpId).innerHTML += "<br><br>";
    document.getElementById(inpId).innerHTML += '<a class="controls"  title="Топ." href="' + jlink + '@top+">@</a> ';
    document.getElementById(inpId).innerHTML += '<a class="controls"  title="Показать вашу ленту." href="' + jlink + '#">#</a>';
    document.getElementById(inpId).innerHTML += ' <a class="controls" title="Показать последние 10 сообщений" href="' + jlink + '#+">#+</a> ';
}

/**
 * @description A nizer for bnw.blasux.ru
 *
 * @return void
 */
function bnwizer(inpId){
    var blink = "xmpp:bnw.blasux.ru?message;body=";
    var msgNumRegEx = /--- ([A-Z0-9]{6})/igm;
    var nickRegEx   = /\+\+\+ (\[.+?\]) ([\w\d-]+)( \(in reply to (([A-Z0-9]{6})(\/([A-Z0-9]{3}))\)))?:/igm;
    //var tagRegEx    = / /igm;
    wrap(inpId, msgNumRegEx, '<a>', 'class="msgNum" href="' + blink + 'show%20--message=$1"', '$1');
    wrap(inpId, nickRegEx, '<a>', 'class="nick" href="' + blink + 'show%20--user=$2"', '@$2', '', ' $1');

    var msgNumRegEx2 = /(([A-Z0-9]{6})(\/[A-Z0-9]{3})?<\/A>)/gm;
    var msgNumControl = '(<a class="controls" title="Показать комментарии" href="' + 
                        blink + 
                        's%20-r%20-m%20$2">+</a>)';
    add(inpId, msgNumRegEx2, msgNumControl);

    document.getElementById(inpId).innerHTML += "<br><br>";
    document.getElementById(inpId).innerHTML += ' <a class="controls" title="Показать последние сообщения" href="' + 
                                                blink + 
                                                'show">> show last</a></br> ';
}

/** 
 * @description A nizer for psto.net.
 *
 * @return void
 */
function pstonizer(inpId){
    var pstolink = "xmpp:psto@psto.net?message;body=";
    // regexp для номеров сообщений. 
    // пример работы:
    // для номера #123456/1 в $1 - будет #123456/1, в $2 - #123456
    var msgNumRegEx = /\B((#[A-Za-z]{7})(\/\d+)?)/igm;
    var nickRegEx = /\B(@[a-zA-Z0-9-.@_|]+)\b/gm;
    var tagRegEx = /(\*\S+?)(?=<br>| \*)/igm;
        
    wrap(inpId, tagRegEx, '<a>', 'class="tag" href="' + pstolink + '$1"');
    // обoрачиваем номера постов/комментов ссылками
    wrap(inpId, msgNumRegEx, '<a>', 'class="msgNum" href="' + pstolink + '$1%20"');
    // оборачиваем ники ссылками
    wrap(inpId, nickRegEx, '<span>', 'class="nick"');
    // добавляем управление вставкой номеров постов/комментариев
    var msgNumRegEx2 = /\B(((#[A-Za-z]{7})(\/\d+)?)<\/a>)/igm;
    // #123456+
    var msgNumControl = '(<a class="controls" title="Показать комментарии" href="' + pstolink + '$3+">+</a>';
    // S #123456
    msgNumControl += ' <a class="controls" title="Подписаться на комментарии" href="' + pstolink + 'S%20$3">S</a>';
    // U #123456
    msgNumControl += ' <a class="controls" title="Отписаться от комментариев" href="' + pstolink + 'U%20$3">U</a>';
    // D #123456
    msgNumControl += ' <a class="controls" title="Удалить запись" href="' + pstolink + 'D%20$2">D</a>)';

    add(inpId, msgNumRegEx2, msgNumControl);
    
    //// Добавляем # и #+ в конец каждого сообщения
    //document.getElementById(inpId).innerHTML += "<br><br>";
    //document.getElementById(inpId).innerHTML += '<a class="controls"  title="Топ." href="' + pstolink + '@top+">@</a> ';
    //document.getElementById(inpId).innerHTML += '<a class="controls"  title="Показать вашу ленту." href="' + pstolink + '#">#</a>';
    //document.getElementById(inpId).innerHTML += ' <a class="controls" title="Показать последние 10 сообщений" href="' + pstolink + '#+">#+</a> ';
}
