 var showVisuLoadingSpinner = function() {
    document.getElementById("loading_background").style.visibility = "visible";
    $('#visualization-panel-transparent-bgd').show();
    $('#visualization-panel-loading').show();
}

var hideVisuLoadingSpinner = function() {
    document.getElementById("loading_background").style.visibility = "hidden";
    $('#visualization-panel-transparent-bgd').hide();
    $('#visualization-panel-loading').hide();
}

 var onClickDL = function(event){
    project = $("#select-project-dropdown-form :selected").attr("value");
    build = $("#select-build-dropdown-form :selected").attr("value");
    part = $("#select-part-dropdown-form :selected").attr("value");

    var siblings = $(this).parent().siblings().each(function(){
       var class_list = this.classList;
       if (class_list.length >= 2) {
          var iterator = class_list.values();
          for (var value of iterator){
              if (value == 'tabContentActive') { frame_id = this.id;  }
          }
       }
    });
   $.ajax({
    url: download_image,
    type: "POST",
    data : {
            frame_id,
            project,
            build,
            part,
        },
    dataType: "json",
    success: function(data) {
        $("#visualization-view-error").hide();
        var image_url = data.image_url;
        var filename = data.file_name;
        var link = document.createElement('a');

        link.href = image_url;
        link.download = filename;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    error: function(){
        showErrorPanel();
    }
  });
 }

 var onClickPrev = function(event){
   frame_id = $(this).parent().parent().attr("id");

   project = $("#select-project-dropdown-form :selected").attr("value");
   build = $("#select-build-dropdown-form :selected").attr("value");
   part = $("#select-part-dropdown-form :selected").attr("value");

   $.ajax({
    url: previous_layer,
    type: "POST",
    data : {
            frame_id,
            project,
            build,
            part,
        },
    dataType: "json",
    success: function(data) {
         $("#visualization-view-error").hide();
         if(data != null) {
            var i;
            for (i = 0; i < data.total_tabs; i++) {
                document.getElementById(data.data_name+'-title-tab'+data.tab[i].toString()).innerHTML = data.title[i];
                document.getElementById(data.data_name+'-img-tab'+data.tab[i].toString()).innerHTML = "<img src=\"" + data.image[i] + "\"/>";
                document.getElementById(data.data_name+'-page-number').innerHTML = data.layer_number.toString() + "/" + data.total_layers.toString();
                };
            };
        },
    error: function(data){
        showErrorPanel();
        }
  });
 }

 var onClickNext = function(event){
   frame_id = $(this).parent().parent().attr("id");
   project = $("#select-project-dropdown-form :selected").attr("value");
   build = $("#select-build-dropdown-form :selected").attr("value");
   part = $("#select-part-dropdown-form :selected").attr("value");

   $.ajax({
    url: next_layer,
    type: "POST",
    data : {
            frame_id,
            project,
            build,
            part,
        },
    dataType: "json",
    success: function(data) {
        $("#visualization-view-error").hide();
        if(data != null) {
            var i;
            for (i = 0; i < data.total_tabs; i++) {
                document.getElementById(data.data_name+'-title-tab'+data.tab[i].toString()).innerHTML = data.title[i];
                document.getElementById(data.data_name+'-img-tab'+data.tab[i].toString()).innerHTML = "<img src=\"" + data.image[i] + "\"/>";
                document.getElementById(data.data_name+'-page-number').innerHTML = data.layer_number.toString() + "/" + data.total_layers.toString();
                };
            };
        },
    error: function(data){
        showErrorPanel();
        }
  });
 }

function loadFrames() {

    showVisuLoadingSpinner();
    project = $("#select-project-dropdown-form :selected").attr("value");
    build = $("#select-build-dropdown-form :selected").attr("value");
    part = $("#select-part-dropdown-form :selected").attr("value");

    $.ajax({
    url: get_frames,
    type: "POST",
    data : {
            project,
            build,
            part,
        },
    dataType: "json",
    success: function(data) {
        if(data != null) {
            $("#visualization-view-error").hide();

            // Build command window
            document.getElementById('build-command-title-tab1').innerHTML = data.build_command_title_tab1;
            document.getElementById('build-command-img-tab1').innerHTML = "<img src=\"" + data.build_command_image_tab1 + "\"/>";
            document.getElementById('build-command-title-tab2').innerHTML = data.build_command_title_tab2;
            document.getElementById('build-command-img-tab2').innerHTML = "<img src=\"" + data.build_command_image_tab2 + "\"/>";
            document.getElementById('build-command-title-tab3').innerHTML = data.build_command_title_tab3;
            document.getElementById('build-command-img-tab3').innerHTML = "<img src=\"" + data.build_command_image_tab3 + "\"/>";
            document.getElementById('build-command-page-number').innerHTML = data.build_command_layer.toString() + "/" + data.build_command_total_layers.toString();

            // Melt-pool window
            document.getElementById('melt-pool-title-tab1').innerHTML = data.melt_pool_title_tab1;
            document.getElementById('melt-pool-img-tab1').innerHTML = "<img src=\"" + data.melt_pool_image_tab1 + "\"/>";
            document.getElementById('melt-pool-title-tab2').innerHTML = data.melt_pool_title_tab2;
            document.getElementById('melt-pool-img-tab2').innerHTML = "<img src=\"" + data.melt_pool_image_tab2 + "\"/>";
            document.getElementById('melt-pool-page-number').innerHTML = data.melt_pool_layer.toString() + "/" + data.melt_pool_total_layers.toString();

            // Layer-wise window
            document.getElementById('layer-wise-title-tab1').innerHTML = data.layer_wise_title_tab1;
            document.getElementById('layer-wise-img-tab1').innerHTML = "<img src=\"" + data.layer_wise_image_tab1 + "\"/>";
            document.getElementById('layer-wise-title-tab2').innerHTML = data.layer_wise_title_tab2;
            document.getElementById('layer-wise-img-tab2').innerHTML = "<img src=\"" + data.layer_wise_image_tab2 + "\"/>";
            document.getElementById('layer-wise-page-number').innerHTML = data.layer_wise_layer.toString() + "/" + data.layer_wise_total_layers.toString();

            // XCT computed-tomography window
            document.getElementById('xray-computed-tomography-title-tab1').innerHTML = data.xray_computed_tomography_title_tab1;
            document.getElementById('xray-computed-tomography-img-tab1').innerHTML = "<img src=\"" + data.xray_computed_tomography_image_tab1 + "\"/>";
            document.getElementById('xray-computed-tomography-page-number').innerHTML = data.xray_computed_tomography_layer.toString() + "/" + data.xray_computed_tomography_total_layers.toString();


            $('#access-layer-number-build-command').val('');
            $('#access-layer-number-melt-pool').val('');
            $('#access-layer-number-layer-wise').val('');
            $('#access-layer-number-xray-computed-tomography').val('');
            hideVisuLoadingSpinner();
            };
        },
    error: function(data){
        hideVisuLoadingSpinner();
        showErrorPanel();
        }
  });
}

 var loadInfo = function(event){
   project = $("#select-project-dropdown-form :selected").attr("value");
   build = $("#select-build-dropdown-form :selected").attr("value");
   part = $("#select-part-dropdown-form :selected").attr("value");
   $.ajax({
    url: update_insitu_data_info,
    type: "GET",
    data: {
        project,
        build,
        part,
    },
    dataType: "json",
    success: function(data) {
       if(data !== null) {
            document.getElementById('data-info').innerHTML = data.form;
            };
       },
    error: function(data){
        hideVisuLoadingSpinner();
        console.log("Error");
        }
  });
 }

// .ready() called.
$(function() {
   showVisuLoadingSpinner();
   loadFrames();
   display_3d_visualization();
   hideVisuLoadingSpinner();

   // Build command window
   $('#download-build-command').on("click", onClickDL);
   $('#previous-build-command-tab1').on("click", onClickPrev);
   $('#next-build-command-tab1').on("click", onClickNext);
   $('#previous-build-command-tab2').on("click", onClickPrev);
   $('#next-build-command-tab2').on("click", onClickNext);
   $('#previous-build-command-tab3').on("click", onClickPrev);
   $('#next-build-command-tab3').on("click", onClickNext);

   // Melt-pool window
   $('#download-melt-pool').on("click", onClickDL);
   $('#previous-melt-pool-tab1').on("click", onClickPrev);
   $('#next-melt-pool-tab1').on("click", onClickNext);
   $('#previous-melt-pool-tab2').on("click", onClickPrev);
   $('#next-melt-pool-tab2').on("click", onClickNext);

   // Layer-wise window
   $('#download-layer-wise').on("click", onClickDL);
   $('#previous-layer-wise-tab1').on("click", onClickPrev);
   $('#next-layer-wise-tab1').on("click", onClickNext);
   $('#previous-layer-wise-tab2').on("click", onClickPrev);
   $('#next-layer-wise-tab2').on("click", onClickNext);

   // XCT computed-tomography
   $('#download-xray-computed-tomography').on("click", onClickDL);
   $('#previous-xray-computed-tomography-tab1').on("click", onClickPrev);
   $('#next-xray-computed-tomography-tab1').on("click", onClickNext);
});

var showErrorPanel = function() {
    hideVisuLoadingSpinner();
    $("#visualization-view-error").show();
}