

document.getElementsByTagName('html')[0].className += ' ' +
	("ActiveXObject" in window? 'ie' : 'no-ie')


function coverflowimages(options){
	if ( !document.getElementById('coverflowoverlay') ){
		var $overlay = $('<div id="coverflowoverlay" />').appendTo(document.body)
		var $enlargearea = $('<div id="coverenlargearea" />').appendTo(document.body)
	}
	else{
		var $overlay = $('#coverflowoverlay')
		var $enlargearea = $('#coverenlargearea')
	}
	var $body = $(document.body)
	var $overlayenlarge = $overlay.add($enlargearea)
	var $wrap  = $('#' + options.coverid)
	var $frame = $wrap.find('div.frame:eq(0)')
	var frameinnerHTML = ''
	var activeitem = -1
	var onselecteditemclick = options.onselecteditemclick || selecteditemaction

	var preloadimages = []
	for (var i = 0; i<options.images.length; i++){
		if (options.images[i][1]){
			if (options.preloadlarge){
				preloadimages[i] = new Image()
				preloadimages[i].src = options.images[i][1]
			}
		}
		frameinnerHTML += '<li style="background-image:url(' + options.images[i][0] + ')" data-itemindex="' + i +'"></li>\n'
	}
	$frame.find('ul:eq(0)').html( frameinnerHTML )

	function selecteditemaction(e, activeitem){ // default call back function for onselecteditemclick, showing enlarged image
		$overlay.css({opacity:.9, zIndex: 1000})
		$enlargearea.html('<img src="' + options.images[activeitem][1] + '"/>' + 
			((options.images[activeitem][2])? '<div id="desc">' + options.images[activeitem][2] +'</div>': '')
		)

		var maxheight = $(window).height()
		$enlargearea.css({opacity:1, zIndex: 1001})
		.data('isvisible', true)
		.find('img:eq(0)')
			.css({maxWidth: $(window).width() * .95, maxHeight: $(window).height()})
		e.stopPropagation()

	}
	
	// Call Sly on frame. See https://github.com/darsain/sly/blob/master/docs/Options.md
	$frame.sly({
		horizontal: 1,
		itemNav: 'forceCentered',
		smart: 1,
		activateMiddle: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		startAt: 1,
		scrollBar: $wrap.find('.scrollbar'),
		scrollBy: 1,
		speed: 300,
		elasticBounds: 1,
		easing: 'swing',
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1,
		// Navigation buttons
		pagesBar: $wrap.find('.pages'),
		activatePageOn: 'click'
	})


	$(window).on('resize', function(){
		$frame.sly("reload");
	})

	$frame.on('mousedown', function(e){ // test during 'mousedown' phase if distination LI is active item, before 'onclick'
		if (  $(e.target).hasClass('active') ){
			activeitem = $(e.target).data('itemindex')
		}
	})

	$frame.on('click', function(e){ // onclick the main cover flow container
		var $target = $(e.target)
		if (  $(e.target).data('itemindex') == activeitem ){
			onselecteditemclick(e, activeitem)
		}
	})

	$overlayenlarge.unbind().on('click', function(){
		if ( $enlargearea.data('isvisible') ){
			$overlayenlarge.css({opacity:0, zIndex:-1})
			$enlargearea.data('isvisible', false)
		}
	})

}

///////// Initialization code ////////////////

coverflowimages({
	coverid: 'coverflow1',
	images: [
						['me1.jpeg', 'me1.jpeg', 'It was halloween, I tried to make a scary face but it ended up being funny instead'],
						['me4.jpg', 'me4.jpg', 'I was a given a surprise birthday by my best friend, the feeling was so amazing'],
						['mimi.jpg', 'mimi.jpg','I had visited the Safaricom Tech Expo that had been held at the KICC and I decided to take a selfie'],
						['me2.jpg', 'me2.jpg','I was enjoying mother nature on a cool Saturday evening an the JKUAT Sajorec gardens'],
						['me3.jpg', 'me3.jpg', 'I love sunsets so at times when am free in the evenings I watch sunsets'],
						['me5.jpeg', 'me5.jpeg', 'I was listening to my favourites songs of the decade on Spotify']
						 // <-- no comma after last image
					] // <-- no comma after last option
})