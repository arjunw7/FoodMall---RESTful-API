// var foodItems = { "breakfast":[
// {"name":"Corn Flakes", "price":25, "location":"../images/menu/breakfast/cornFlakes.jpg"},
// {"name":"Vada Pav", "price":20,  "location":"../images/menu/breakfast/vadaPav.jpg"},
// {"name":"Bread Jam", "price":20, "location":"../images/menu/breakfast/breadJam.jpg"},
// {"name":"Aaloo Paratha", "price":20, "location":"../images/menu/breakfast/aalooParatha.jpg"},
// {"name":"Gobi Paratha", "price":20, "location":"../images/menu/breakfast/gobiParatha.jpg"},
// {"name":"Omlette", "price":20, "location":"../images/menu/breakfast/omlette.jpg"},
// {"name":"Scrambbled Egg", "price":25, "location":"../images/menu/breakfast/scramblledEgg.jpg"}],
// "milkShakes":[
// {"name":"Chocolate Shake", "price":40, "location":"../images/menu/milkShakes/chocolateShake.jpg"},
// {"name":"Vanila Shake", "price":40, "location":"../images/menu/milkShakes/vanillaShake.jpg"},
// {"name":"Butterscotch Shake", "price":45, "location":"../images/menu/milkShakes/butterscotchShake.jpg"},
// {"name":"Mango Shake", "price":45, "location":"../images/menu/milkShakes/mangoShake.jpg"}],
// "beverages":[
// {"name":"Hot Tea", "price":7, "location":"../images/menu/beverages/tea.jpg"},
// {"name":"Hot COffee", "price":10, "location":"../images/menu/beverages/coffee.jpg"},
// {"name":"Orange Juice", "price":40, "location":"../images/menu/beverages/orangeJuice.jpg"},
// {"name":"Watermelon Juice", "price":30, "location":"../images/menu/beverages/watermelonJuice.jpg"},
// {"name":"Guava Juice", "price":40, "location":"../images/menu/beverages/guavaJuice.jpg"},
// {"name":"Apple Juice", "price":30, "location":"../images/menu/beverages/appleJuice.jpg"}],
// "southIndian":[
// {"name":"Plain Dosa", "price":15, "location":"../images/menu/southIndian/plainDosa.jpg"},
// {"name":"Masala Dosa", "price":25, "location":"../images/menu/southIndian/masalaDosa.jpg"},
// {"name":"Rawa Dosa", "price":25, "location":"../images/menu/southIndian/rawaDosa.jpg"},
// {"name":"Onion Dosa", "price":25, "location":"../images/menu/southIndian/onionDosa.jpg"},
// {"name":"Sambhar Idli", "price":20, "location":"../images/menu/southIndian/sambharIdli.jpg"},
// {"name":"Sambhar Vada", "price":20, "location":"../images/menu/southIndian/sambharVada.jpg"}],
// "chinese":[
// {"name":"Veg Noodles", "price":"35"},
// {"name":"Egg Noodles", "price":"40"},
// {"name":"Chicken Noodles", "price":"40"},
// {"name":"Schezwan Noodles", "price":"45"},
// {"name":"Veg Fried Rice", "price":"40"},
// {"name":"Egg Fried Rice", "price":"40"},
// {"name":"Chicken Fried Rice", "price":"40"}],
// "vegStarters":[
// {"name":"Chilli Paneer", "price":"15"},
// {"name":"Honey Chilli Potato", "price":"25"},
// {"name":"Crispy Potato", "price":"25"},
// {"name":"Chicken Lollipop", "price":"25"},
// {"name":"Chicken Wings", "price":"20"},
// {"name":"Chilli Chicken", "price":"20"}],
// menu:1, itemName:0, itemPrice:0, qty:0,total:0
// };
// var eventToUse = 'tap';
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