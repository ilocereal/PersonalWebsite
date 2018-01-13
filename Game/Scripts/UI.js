let keywords = [
  "more food", "more wood", "more stone"
];

function getDimensions(){
    return [$(window).width(), $(window).height()];
}

function parseDescription(str){
    let lines = str.split('\\n');
    let display ="";
    /*
    for (let i in lines){
        for (let word in keywords){
            let keyword = new RegExp(`${keywords[word]}`, 'i');
            let match = lines[i].match(keyword);
            console.log(match);
            if (match){
                console.log(keyword);
                lines[i].replace(keywords[word], '<p style="color: green;">'+ keywords[word] +'</p>')
            }
        }
    }
    */
    for (let i in lines){
        display += '<p> ' +  lines[i] + '</p>';
    }
    console.log(display);
    console.log(str);
    console.log(lines);
    $('#description').html(display)
}

function openTab(name, ref){
    // Hide all elements with class="tabcontent" by default */
    let tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Show the specific tab content

    let destination = $('#' + name);
    console.log(destination);
    destination.css('display', "block");

    let tabs = $('.tablink');
    // no need to create loops when selecting classes with jQuery
    tabs.removeClass('btn-primary');

    $('#' + name + 'tab').addClass('btn-primary');

}

$(document).ready(function() {
    // here are the things that are going to run once the window loaded



    let upgrades = $('#upgrades');
    // this height is going to change for every available upgrade
    let height = getDimensions()[1] * 0.7;
    //let height = upgrades.amount * 40;
    let headerHeight = 50;

    function closeUpgrades(){
        // we'll end up updating this later on
        $('#description').html("");
    }
    // ------- hovers -------
    $('#upgrades-container').hover(function() { // mouse is hovered
        $(this).stop().animate({
            height: height + 'px'
        });
        upgrades.css('display', 'block');
        // controlling for padding
        upgrades.css('height', height -  headerHeight - 2 * 5);
    },
        function(){    // mouse is unhovered
        $(this).stop().animate({
            height: 60 + 'px'
        }, function(){ // closing animation is over
            upgrades.css('display', 'none');
            upgrades.css('height', headerHeight);
        });
    });


    // displaying tooltips
    $('.upgrade').hover(function(){
        $(this).css('cursor', 'pointer');
        // we might want to send this to a handler and check for \n with regex and make a new line dynamically
        // or something like that
        let title = $(this).attr('aria-label');
        parseDescription(title);
        // we don't want to directly set this to empty on hover out, we might want a cookie
        // clicker type scrolling text of random shit later
    }, closeUpgrades);


    //upgrades.display('Blessing of The Hunt', allUpgrades['Blessing of The Hunt']);

    //print("save-message", "Hey! game saves are now a feature but expect your save data to get wiped as new features are added.\n");


    $('.tltp').hover(()=>{
        $('selector').css('cursor', 'pointer');

    });

    // we want a tooltip for anything that has a title in it, this only includes upgrades so far]

    $('.tabcontent').on('click', function(name, ref){
        ref.preventDefault();
        openTab(name, ref);
    })
});
