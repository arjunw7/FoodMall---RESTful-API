// $(document).ready(function(){
// 	makeTemplates();
// 	$.tmpl("menuItems", foodItems).appendTo(".items");
// 	var parent, ink, d, x, y;
// 		$("button div, .tag, .circle").click(function(e){
// 			parent = $(this).parent();
// 			//create .ink element if it doesn't exist
// 			if(parent.find(".ink").length == 0)
// 				parent.prepend("<span class='ink'></span>");
				
// 			ink = parent.find(".ink");
// 			//incase of quick double clicks stop the previous animation
// 			ink.removeClass("animate");
			
// 			//set size of .ink
// 			if(!ink.height() && !ink.width())
// 			{
// 				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
// 				d = Math.max(parent.outerWidth(), parent.outerHeight());
// 				ink.css({height: d, width: d});
// 			}
			
// 			//get click coordinates
// 			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
// 			x = e.pageX - parent.offset().left - ink.width()/2;
// 			y = e.pageY - parent.offset().top - ink.height()/2;
			
// 			//set the position and add class .animate
// 			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
// 		});
// $(".circle").click(function(){
// 			foodItems.itemName = $(this).prev().prev().html();
// 			foodItems.itemPrice = $(this).prev().html();
// 			foodItems.price =  parseInt(foodItems.itemPrice);
// 			foodItems.total=(foodItems.total + foodItems.price);
// 			makeTemplates();
// 			$.tmpl("bill", foodItems).appendTo(".billDetails");
// 			$('.totalAmount').empty();
// 			$.tmpl("total", foodItems).appendTo(".totalAmount");
// 	});
// 	bind(".breakfast", openBreakfast);
// 	bind(".milkShakes", openMilkShakes);
// 	bind(".beverages", openBeverages);
// 	bind(".southIndian", openSouthIndian);
// 	bind(".chinese", openChinese);
// 	bind(".vegStarters", openVegStarters);
// 	$(".text").click(function(){
// 		$(".addOrder").css("top","0px");
// 		$(".proceedButton").css("top","540px");
// 		$(".formFirst").css("left","-110%");
// 		$(".formSecond").css("left","-110%");
// 	});
// 	$(".existingAcct").click(function(){
// 		$(".formSecond").css("top","200px");
// 		$(".customerType").css("left","-110%");
// 		$(".brand").css("display","block");
// 	});
// 	$(".newAcct").click(function(){
// 		$(".formFirst").css("top","200px");
// 		$(".customerType").css("left","-110%");
// 		$(".brand").css("display","block");
// 	});
// 	$(".proceedButton").click(function(){
// 		$(".list").animate({top: "110%", opacity: ".1"}, 500);
// 		$(".items").animate({top: "110%", opacity: ".1"}, 500);
// 		$(".bill").animate({left: "-500px"}, 500, function(){
// 			$(".printButton").show(500);
// 		});
// 		$(".proceedButton").hide(500);

// 	});
// 	$(".printButton").click(function(){
// 		$(".addOrder").animate({ top: "100%"}, 500, function(){
// 			$(this).hide();
// 		});
// 		$(".note").css("left", "0px");
// 	});
// 	$(".homeButton").click(function(){
// 		location.reload();
// 	})
//  });
// function openBreakfast(){
// 		foodItems.menu=1;
// 		$(".items").empty();
// 		$.tmpl("menuItems", foodItems).appendTo(".items");
// 		bind(".breakfast", openBreakfast);
// 		bind(".milkShakes", openMilkShakes);
// 		bind(".beverages", openBeverages);
// 		bind(".southIndian", openSouthIndian);
// 		bind(".chinese", openChinese);
// 		bind(".vegStarters", openVegStarters);
// 		$(".circle").click(function(){
// 			foodItems.itemName = $(this).prev().prev().html();
// 			foodItems.itemPrice = $(this).prev().html();
// 			foodItems.price =  parseInt(foodItems.itemPrice);
// 			foodItems.qty=foodItems.qty+1;
// 			foodItems.total=(foodItems.total + foodItems.price);
// 			makeTemplates();
// 			$.tmpl("bill", foodItems).appendTo(".billDetails");
// 			$('.totalAmount').empty();
// 			$.tmpl("total", foodItems).appendTo(".totalAmount");
// 	});
// 		var parent, ink, d, x, y;
// 		$("button div, .tag, .circle").click(function(e){
// 			parent = $(this).parent();
// 			//create .ink element if it doesn't exist
// 			if(parent.find(".ink").length == 0)
// 				parent.prepend("<span class='ink'></span>");
				
// 			ink = parent.find(".ink");
// 			//incase of quick double clicks stop the previous animation
// 			ink.removeClass("animate");
			
// 			//set size of .ink
// 			if(!ink.height() && !ink.width())
// 			{
// 				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
// 				d = Math.max(parent.outerWidth(), parent.outerHeight());
// 				ink.css({height: d, width: d});
// 			}
			
// 			//get click coordinates
// 			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
// 			x = e.pageX - parent.offset().left - ink.width()/2;
// 			y = e.pageY - parent.offset().top - ink.height()/2;
			
// 			//set the position and add class .animate
// 			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
// 		});
// }
// function openMilkShakes(){
// 		foodItems.menu=2;
// 		$(".items").empty();
// 		$.tmpl("menuItems", foodItems).appendTo(".items");
// 		$(".items")
// 		bind(".breakfast", openBreakfast);
// 		bind(".milkShakes", openMilkShakes);
// 		bind(".beverages", openBeverages);
// 		bind(".southIndian", openSouthIndian);
// 		bind(".chinese", openChinese);
// 		bind(".vegStarters", openVegStarters);
// 		$(".circle").click(function(){
// 			foodItems.itemName = $(this).prev().prev().html();
// 			foodItems.itemPrice = $(this).prev().html();
// 			foodItems.price =  parseInt(foodItems.itemPrice);
// 			foodItems.qty=foodItems.qty+1;
// 			foodItems.total=(foodItems.total + foodItems.price);
// 			makeTemplates();
// 			$.tmpl("bill", foodItems).appendTo(".billDetails");
// 			$('.totalAmount').empty();
// 			$.tmpl("total", foodItems).appendTo(".totalAmount");
// 	});
// 		var parent, ink, d, x, y;
// 		$("button div, .tag, .circle").click(function(e){
// 			parent = $(this).parent();
// 			//create .ink element if it doesn't exist
// 			if(parent.find(".ink").length == 0)
// 				parent.prepend("<span class='ink'></span>");
				
// 			ink = parent.find(".ink");
// 			//incase of quick double clicks stop the previous animation
// 			ink.removeClass("animate");
			
// 			//set size of .ink
// 			if(!ink.height() && !ink.width())
// 			{
// 				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
// 				d = Math.max(parent.outerWidth(), parent.outerHeight());
// 				ink.css({height: d, width: d});
// 			}
			
// 			//get click coordinates
// 			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
// 			x = e.pageX - parent.offset().left - ink.width()/2;
// 			y = e.pageY - parent.offset().top - ink.height()/2;
			
// 			//set the position and add class .animate
// 			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
// 		})
// }
// function openBeverages(){
// 		foodItems.menu=3;
// 		$(".items").empty();
// 		$.tmpl("menuItems", foodItems).appendTo(".items");
// 		bind(".breakfast", openBreakfast);
// 		bind(".milkShakes", openMilkShakes);
// 		bind(".beverages", openBeverages);
// 		bind(".southIndian", openSouthIndian);
// 		bind(".chinese", openChinese);
// 		bind(".vegStarters", openVegStarters);
// 		$(".circle").click(function(){
// 			foodItems.itemName = $(this).prev().prev().html();
// 			foodItems.itemPrice = $(this).prev().html();
// 			foodItems.price =  parseInt(foodItems.itemPrice);
// 			foodItems.qty=foodItems.qty+1;
// 			foodItems.total=(foodItems.total + foodItems.price);
// 			makeTemplates();
// 			$.tmpl("bill", foodItems).appendTo(".billDetails");
// 			$('.totalAmount').empty();
// 			$.tmpl("total", foodItems).appendTo(".totalAmount");
// 	});
// 		var parent, ink, d, x, y;
// 		$("button div, .tag, .circle").click(function(e){
// 			parent = $(this).parent();
// 			//create .ink element if it doesn't exist
// 			if(parent.find(".ink").length == 0)
// 				parent.prepend("<span class='ink'></span>");
				
// 			ink = parent.find(".ink");
// 			//incase of quick double clicks stop the previous animation
// 			ink.removeClass("animate");
			
// 			//set size of .ink
// 			if(!ink.height() && !ink.width())
// 			{
// 				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
// 				d = Math.max(parent.outerWidth(), parent.outerHeight());
// 				ink.css({height: d, width: d});
// 			}
			
// 			//get click coordinates
// 			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
// 			x = e.pageX - parent.offset().left - ink.width()/2;
// 			y = e.pageY - parent.offset().top - ink.height()/2;
			
// 			//set the position and add class .animate
// 			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
// 		})
// }
// function openSouthIndian(){
// 		foodItems.menu=4;
// 		$(".items").empty();
// 		$.tmpl("menuItems", foodItems).appendTo(".items");
// 		bind(".breakfast", openBreakfast);
// 		bind(".milkShakes", openMilkShakes);
// 		bind(".beverages", openBeverages);
// 		bind(".southIndian", openSouthIndian);
// 		bind(".chinese", openChinese);
// 		bind(".vegStarters", openVegStarters);
// 		$(".circle").click(function(){
// 			foodItems.itemName = $(this).prev().prev().html();
// 			foodItems.itemPrice = $(this).prev().html();
// 			foodItems.price =  parseInt(foodItems.itemPrice);
// 			foodItems.qty=foodItems.qty+1;
// 			foodItems.total=(foodItems.total + foodItems.price);
// 			makeTemplates();
// 			$.tmpl("bill", foodItems).appendTo(".billDetails");
// 			$('.totalAmount').empty();
// 			$.tmpl("total", foodItems).appendTo(".totalAmount");
// 	});
// 		var parent, ink, d, x, y;
// 		$("button div, .tag, .circle").click(function(e){
// 			parent = $(this).parent();
// 			//create .ink element if it doesn't exist
// 			if(parent.find(".ink").length == 0)
// 				parent.prepend("<span class='ink'></span>");
				
// 			ink = parent.find(".ink");
// 			//incase of quick double clicks stop the previous animation
// 			ink.removeClass("animate");
			
// 			//set size of .ink
// 			if(!ink.height() && !ink.width())
// 			{
// 				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
// 				d = Math.max(parent.outerWidth(), parent.outerHeight());
// 				ink.css({height: d, width: d});
// 			}
			
// 			//get click coordinates
// 			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
// 			x = e.pageX - parent.offset().left - ink.width()/2;
// 			y = e.pageY - parent.offset().top - ink.height()/2;
			
// 			//set the position and add class .animate
// 			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
// 		})
// }
// function openChinese(){
// 		foodItems.menu=5;
// 		$(".items").empty();
// 		$.tmpl("menuItems", foodItems).appendTo(".items");
// 		bind(".breakfast", openBreakfast);
// 		bind(".milkShakes", openMilkShakes);
// 		bind(".beverages", openBeverages);
// 		bind(".southIndian", openSouthIndian);
// 		bind(".chinese", openChinese);
// 		bind(".vegStarters", openVegStarters);
// 		$(".circle").click(function(){
// 			foodItems.itemName = $(this).prev().prev().html();
// 			foodItems.itemPrice = $(this).prev().html();
// 			foodItems.price =  parseInt(foodItems.itemPrice);
// 			foodItems.qty=foodItems.qty+1;
// 			foodItems.total=(foodItems.total + foodItems.price);
// 			makeTemplates();
// 			$.tmpl("bill", foodItems).appendTo(".billDetails");
// 			$('.totalAmount').empty();
// 			$.tmpl("total", foodItems).appendTo(".totalAmount");
// 	});
// 		var parent, ink, d, x, y;
// 		$("button div, .tag, .circle").click(function(e){
// 			parent = $(this).parent();
// 			//create .ink element if it doesn't exist
// 			if(parent.find(".ink").length == 0)
// 				parent.prepend("<span class='ink'></span>");
				
// 			ink = parent.find(".ink");
// 			//incase of quick double clicks stop the previous animation
// 			ink.removeClass("animate");
			
// 			//set size of .ink
// 			if(!ink.height() && !ink.width())
// 			{
// 				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
// 				d = Math.max(parent.outerWidth(), parent.outerHeight());
// 				ink.css({height: d, width: d});
// 			}
			
// 			//get click coordinates
// 			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
// 			x = e.pageX - parent.offset().left - ink.width()/2;
// 			y = e.pageY - parent.offset().top - ink.height()/2;
			
// 			//set the position and add class .animate
// 			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
// 		})
// }
// function openVegStarters(){
// 		foodItems.menu=6;
// 		$(".items").empty();
// 		$.tmpl("menuItems", foodItems).appendTo(".items");
// 		bind(".breakfast", openBreakfast);
// 		bind(".milkShakes", openMilkShakes);
// 		bind(".beverages", openBeverages);
// 		bind(".southIndian", openSouthIndian);
// 		bind(".chinese", openChinese);
// 		bind(".vegStarters", openVegStarters);
// 		$(".circle").click(function(){
// 			foodItems.itemName = $(this).prev().prev().html();
// 			foodItems.itemPrice = $(this).prev().html();
// 			foodItems.price =  parseInt(foodItems.itemPrice);
// 			foodItems.qty=foodItems.qty+1;
// 			foodItems.total=(foodItems.total + foodItems.price);
// 			makeTemplates();
// 			$.tmpl("bill", foodItems).appendTo(".billDetails");
// 			$('.totalAmount').empty();
// 			$.tmpl("total", foodItems).appendTo(".totalAmount");
// 	});
// 		var parent, ink, d, x, y;
// 		$("button div, .tag, .circle").click(function(e){
// 			parent = $(this).parent();
// 			//create .ink element if it doesn't exist
// 			if(parent.find(".ink").length == 0)
// 				parent.prepend("<span class='ink'></span>");
				
// 			ink = parent.find(".ink");
// 			//incase of quick double clicks stop the previous animation
// 			ink.removeClass("animate");
			
// 			//set size of .ink
// 			if(!ink.height() && !ink.width())
// 			{
// 				//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
// 				d = Math.max(parent.outerWidth(), parent.outerHeight());
// 				ink.css({height: d, width: d});
// 			}
			
// 			//get click coordinates
// 			//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
// 			x = e.pageX - parent.offset().left - ink.width()/2;
// 			y = e.pageY - parent.offset().top - ink.height()/2;
			
// 			//set the position and add class .animate
// 			ink.css({top: y+'px', left: x+'px'}).addClass("animate");
// 		})
// }