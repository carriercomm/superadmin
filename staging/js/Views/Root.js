define (
	['backbone', 'Session', 'Views/Navigation'],
	function (Backbone, Session, NavigationView)
	{
		var Root = Backbone.View.extend({
		
			view: null,
			header: null,
			footer: null,
		
			initialize: function ()
			{
				this.navigation = new NavigationView (this);
				$('#sidebar').html(this.navigation.render().el);
			},
		
			render: function ()
			{
				// Emergency break
				if(!this.view) return null;
				
				// Do some rendering
				$('#page').html (this.view.render ().el);
				
				// Tell your view
				this.view.$el.trigger("rendered");
				
				// Deprecated!
				if(this.view.finish) this.view.finish();
				
				this.navigation.handleSidebarMenu();
			},
		
			setView: function (view)
			{
				
				if (this.view) this.view.remove();
				Session.trigger('destroy:view');
				
				this.view = view;	
					
				this.render();
				
				Session.manage();
			},
			
			viewshare: function ()
			{
				this.share.show();
				
			},
			
			height: function (strict)
			{
				var view = $(window).height(); 
				var document = $(document).height();
				
				return (strict)?
					(document > view? document: view): view;
			},
			
			resize: function()
			{
				// Trigger resize and catch height
				var height = this.height(true);
				this.trigger("resize", height);
				
				$("#inner-content").css("min-height", height-42 + "px");
			},
			
			popup_new: function (view)
			{
		
				// Parameters
				var content = view.render().el;
				
				var params = {title: view.title, actions: view.actions};
				
				// View
				var modal = $(Mustache.render (Templates.popup, params)).modal();
				modal.find(".modal-body").html(content);
				
				// Actions
				if (view.actions)
					modal.find(".modal-footer [data-action]").on("click", function(popup, e){ this.trigger($(e.currentTarget).data("action"), popup)}.bind(view, modal));
				
				// Close listener
				modal.on ("hide", function (){ this.remove(); }.bind(view));
			},
		
			
			popup: function (view)
			{
				var self = this;
		
				var tmpl = Templates.uipopup;
				
				var modal = $(tmpl).modal();
				modal.find ('.modalcontainer').html (view.render ().el);
		
				view.on ('popup:close', function ()
				{
					modal.modal ('hide');
				});
		
				view.on ('content:change', function ()
				{
					self.trigger ('content:change');
				});
			},
		
			confirm: function (message, callback, cancelcallback)
			{
				var data = {};
		
				data.message = message;
				data.options = [
					{
						'token' : 'confirm',
						'label' : this.translateString('yes'),
						'description' : 'Confirm your action'
					}
				];
				data.translate_close = this.translateString('close')
		
				var tmpl = Mustache.render (Templates.uiconfirm, data);
		
				var element = $(tmpl);
				var modal = element.modal();
		
				element.find ('[data-response=confirm]').click (function ()
				{
					callback ();
					modal.modal ('hide');
				});
		
				element.find ('[data-dismiss=modal]').click (function ()
				{
					if(cancelcallback)	cancelcallback ();
				});
			},
		
			alert: function (message, callback)
			{
				var data = {};
		
				data.message = message;
		
				var tmpl = Mustache.render (Templates.uiconfirm, data);
		
				var element = $(tmpl);
				var modal = element.modal();
		
				element.find ('[data-response=confirm]').click (function ()
				{
					callback ();
					modal.modal ('hide');
				});
			},
			
			growl: function (title, message)
			{
				$.gritter.add({title: title, text: message, time: 4000});
			},
			
			information: function (title, message, target)
			{
				if(!target) target = "#inner-content .container-fluid";
				
				$(target).prepend("<div class='alert alert-info'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>" + title + "</strong> " + message + "</div>");
			},
			
			closeInformation: function (title, message, target)
			{
				$("div.alert.alert-info").remove();
			},
		
		
			dialog: function (message, options, callback)
			{
				var data = {};
		
				data.message = message;
				data.options = options;
		
				var tmpl = Mustache.render (Templates.uidialog, data);
		
				var element = $(tmpl);
				var modal = element.modal();
		
				var addevent = function (option)
				{
					element.find ('[data-response=' + option.token + ']').click (function ()
					{
						callback (option);
						modal.modal ('hide');
					});
				}
		
				for (var i = 0; i < options.length; i ++)
				{
					addevent (options[i]);
				}
			}
		});
		
		return Root;
	}
);