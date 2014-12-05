jQuery(function($){
	
	/**
	* Mettez votre date ici (ANNEE, MOIS (0 pour janvier/11 pour décembre), JOUR, HEURE, MINUTE, SECONDE)
	**/
	var launch = new Date(2015,00,00,00,00,00);

	/**
	* Le script, ne pas toucher au risque de tout casser :D
	**/
	var days = $('#days'); 
	var hours = $('#hours'); 
	var minutes = $('#minutes');
	var seconds = $('#seconds'); 

	setDate(); 
	function setDate(){
		var now = new Date();
		var s = (launch.getTime() - now.getTime())/1000; 
		if(s<0){ s = 0; }
		var d = Math.floor(s/86400);	// Combien de jours ?
		days.html('<strong>'+d+'</strong>Day'+(d>1?'s':''));  
		s -= d*86400; 

		var h = Math.floor(s/3600);	// Combien d'heures ?
		hours.html('<strong>'+h+'</strong>Hour'+(h>1?'s':''));   
		s -= h*3600; 

		var m = Math.floor(s/60);	// Combien de minutes ?
		minutes.html('<strong>'+m+'</strong>Minute'+(m>1?'s':''));   

		s = Math.floor(s-m*60); 
		seconds.html('<strong>'+s+'</strong>Second'+(s>1?'s':''));   
		setTimeout(setDate,1000);
	}

	$(window).resize(function(){
		var mt = windowH() - $('.wrap').outerHeight(); 
		$('.wrap').css('marginTop',mt/2-25); 
	}).trigger('resize');

	/**
	*  Tooltipsy
	**/
	$('a[title!=""]').tooltipsy();

	/**
	 * Hauteur de la fenêtre
	 * */
	function windowH(){
	        if (window.innerHeight) return window.innerHeight  ;
	        else{return $(window).Height();}
	}

	/**
	* Flash message
	**/
	function flash(message,type){
		$('.alert').slideUp(500,function(){
			$(this).remove(); 
		});

		if(type == undefined)
			type = 'error';
		var html =   $('<div class="alert '+type+'">\
                <div class="message">'+message+'<a href="#" class="close"></a></div>\
            </div>');        
		html.appendTo('body').hide().slideDown().find('a.close').click(function(){
			var e = $(this).parent().parent(); 
			e.slideUp(500,function(){
				e.remove(); 
			});
			return false; 
		});
	}

	/**
	* Soumission du formulaire
	**/
	$('#subscribeForm').submit(function(){
		var mailinput = $('#mail').addClass('loading'); 
		$.post('subscribe.php',{mail:mailinput.val()},function(data){
			mailinput.removeClass('loading');
			if(data.state == 0){
				flash(data.message,'error'); 
			}else{
				flash(data.message,'success'); 
				mailinput.val(''); 
			}
		},'json');
		return false;
	});

});