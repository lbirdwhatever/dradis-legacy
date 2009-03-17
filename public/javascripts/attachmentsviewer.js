
Ext.ns('dradis.attachments');

dradis.attachments.defaultTemplate= new Ext.XTemplate(
'<tpl for=".">',
  '<div class="thumb-wrap" id="{filename}" style="border:1px solid #ccc">',
  '<div class="thumb"></div>',
  '<span class="x-editable">{filename} [{size} - {created_at}]</span></div>',
'</tpl>',
'<div class="x-clear"></div>'
);

dradis.attachments.ViewerPanel=Ext.extend(Ext.Panel, {
  title:'Attachments',
  layout:'fit',
  fields: {},

  initComponent: function(){
    // Called during component initialization
    var config ={
      items: 
        this.fields.dv = new Ext.DataView({
                                            store: new Ext.data.JsonStore({ 
                                              url:'/nodes/1/attachments.json',
                                              fields:['filename', 'size', 'created_at']
                                            }),
                                            tpl: dradis.attachments.defaultTemplate,
                                            autoHeight:true,
                                            multiSelect: true,
                                            itemSelector:'div.thumb-wrap',
                                            emptyText: 'No attachments to display'
        })
      
    };

    // Config object has already been applied to 'this' so properties can 
    // be overriden here or new properties (e.g. items, tools, buttons) 
    // can be added, eg:
    Ext.apply(this, config);
    Ext.apply(this.initialConfig, config); 
        
    // Before parent code
 
    // Call parent (required)
    dradis.attachments.ViewerPanel.superclass.initComponent.apply(this, arguments);

    // After parent code
    // e.g. install event handlers on rendered component
  },
  updateAttachments:function(node_id){
    var conn = this.fields.dv.store.proxy.conn;
    conn.url = '/nodes/' + node_id + '/attachments.json';
    this.fields.dv.store.load();
  }
});