/*
	Copyright (C) 2013 pMan and karmicbee.
	@author: pMan
	
	ImageScroller is a jQuery plugin for scrolling images vertically or horizontally.
	
	ImageScroller is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function($){
	$.fn.imageScroller = function(opt) {

		var total_size = 0; // holder for sum of width of all children.
		$this = $(this);

		/*
		 * a bit math involved in here. :)
		 * We'll find the width of the container, which is sum of the widths of all its children.
		 * When the mouse moves over the container, set the 'left' position of the
		 * container to get a scroll effect. No acceleration, just linear motion.
		 */
		if(opt.scroll == "vertical") {
			// height is calculated as the sum of heights of all children nodes (non-recursive)
			// total height = element height + padding + border + container_offset
			$this.children().each(function(){
				total_size += $(this).outerHeight(true);
			});

			var container_offset = $this.offset().top;
			var container_size = $(this).parent().height(); // container's original height
			$this.css("height", total_size+"px"); // set with calculated height
		} else {
			// same as 'if' but for horizontal scrolling
			$this.children().each(function(){
				total_size += $(this).outerWidth(true);
			});

			var container_offset = $this.offset().left;
			var container_size = $this.width();
			$this.css("width", total_size+"px");
		}

		var scroll_size = total_size - container_size; // size of the hidden elements/portion in pixels
		var cur = opt.scroll == "vertical" ? "top" : "left" ; // we are using top/left CSS properties for scrolling

		
		// calling a function on the mouse-move over the wrapper
		$this.mousemove(function(e){
			var cur_pos = opt.scroll == "vertical" ? e.pageY : e.pageX ; // X/Y coords of current cursor position
			
			// finding the amount to scroll based on cursor movements
			var displacement = container_size / (cur_pos - container_offset);
			var scroll_length = scroll_size / displacement;

			// left is initially zero (in this case), setting to negative values for scrolling
			if (Math.abs(scroll_length) == scroll_length) {
				$(this).css(cur, "-"+ scroll_length +"px");
				$("#calc").text(cur+ ": -" +scroll_length+"px");
			}
		});
		
	}
})(jQuery);
