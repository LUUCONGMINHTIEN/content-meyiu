/* eslint-disable no-new */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-case-declarations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-shadow */

/* eslint-disable no-unused-expressions */
var g_isAnimatingButton = {};
var g_latestMousePress = "";

// ===== state =====
window.initState = null;
window.initState = () => {
  let rect = getSVGRect("#drag-col");
  let popupInfo = {
    width: rect.width,
    height: rect.height,
    min_visible_x: 0.5 * rect.width,
    min_visible_y: 0.5 * rect.height,
    init_x: rect.x,
    init_y: rect.y,
  };

  let firstPopupRectEl = $("#popup-content").find("rect").eq(0);
  let rectPopup = {
    x: Number(firstPopupRectEl.attr("x")),
    y: Number(firstPopupRectEl.attr("y")),
    width: Number(firstPopupRectEl.attr("width")),
    height: Number(firstPopupRectEl.attr("height")),
  };
  $("use.close-popup").attr(
    "transform",
    `translate(${rectPopup.x + rectPopup.width - 38 - 19} ${rectPopup.y + 19})`
  );

  g_state = {
    c_version: "20230413",
    c_is_show_log: false,
    c_is_init_canvas: false,
    c_screen_width: 1024,
    c_screen_height: 648,

    menu: 2, // 1,  2, 3
    menu_item_selected: 1, // null, 1, 2, 3
    show_popup: false,
    delete_mode: false,
    mode_draw: "", // line_dash, line_solid, hand_dash, hand_solid

    menu_data: {
      1: {},
      2: {},
      3: {},
    },

    controls: {
      ctrl_reset: new Control({
        type: "button",
        id: "btn-reset",
        value: "inactive",
        mouseup_immediately: function () {
          const ctrl = this;
          ctrl.value = "inactive";
          ctrl.render();
         
        },
        mouseup: function () {
          const ctrl = this;

          let menuData = g_state.menu_data[g_state.menu_item_selected];

          g_state.mode_draw = "";
          g_state_controls
            .filter((x) => x.mark == "mode-draw")
            .forEach((c) => {
              c.value = "inactive";
              c.render();
            });
          menuData.line_delete = [];

          let ctrlDragCol = g_state.controls.ctrl_drag_col;
          ctrlDragCol.value1 = g_default_state.controls.ctrl_drag_col.value1;
          ctrlDragCol.is_snap = g_default_state.controls.ctrl_drag_col.is_snap;
          ctrlDragCol.snap_idx =
            g_default_state.controls.ctrl_drag_col.snap_idx;
          ctrlDragCol.render();

          // getEl(`.select-menu-item-${g_state.menu_item_selected}`).find(".lines-drawed").empty();
        },
        mousedown: function () { },
        render: function () {
          const ctrl = this;
          showElement(`.${ctrl.id}`, false);
          if (g_state.menu == 2) {
            showElement(`#${ctrl.id}-${ctrl.value}`, true);
          }
        },
      }),

   
      ctrl_show_red: new Control({
        type: "button",
        id: "btn-show",
        value: "inactive",
        event_for_active_state: true,
        ignore_mouseup: true,
        mouseup: function () {
          const ctrl = this;
          ctrl.value = {
            active: "inactive",
            inactive: "active",
          }[ctrl.value];

          ctrl.render();
          if(ctrl.value == "inactive"){
            showElement('.paper-red', true)
          }else{
            showElement('.paper-red', false)
          }          
        },
        mousedown: function () {
          let ctrl = this;
          ctrl.render();
          if(ctrl.value == "inactive"){
            showElement('.paper-red', true)
          } else{
            showElement('.paper-red', false)
          }
        },
        render: function () {
          const ctrl = this;
          showElement('.paper-red', true)
          showElement(`.${ctrl.id}`, false);
          showElement(`#${ctrl.id}-${ctrl.value}`, true);     
        },
      }),


      ctrl_show_redd: new Control({
        type: "button",
        id: "btn-showz",
        value: "inactive",
        event_for_active_state: true,
        ignore_mouseup: true,
        mouseup: function () {
          const ctrl = this;
          ctrl.value = {
            active: "inactive",
            inactive: "active",
          }[ctrl.value];

          ctrl.render();
          if(ctrl.value == "inactive"){
            showElement('.note-y-2', true)
          }else{
            showElement('.paper-yellow-2', false)
          }          
        },
        mousedown: function () {
          let ctrl = this;
          ctrl.render();
          if(ctrl.value == "inactive"){
            showElement('.note-y-2', true)
          } else{
            showElement('.paper-yellow-2', false)
          }
        },
        render: function () {
          const ctrl = this;
          showElement('.paper-yellow-2', true)
          showElement(`.${ctrl.id}`, false);
          showElement(`#${ctrl.id}-${ctrl.value}`, true);     
        },
      }),


      ctrl_show_yellow: new Control({
        type: "button",
        id: "btn-show-y",
        value: "inactive",
        event_for_active_state: true,
        ignore_mouseup: true,
        mouseup: function () {
          const ctrl = this;
          ctrl.value = {
            active: "inactive",
            inactive: "active",
          }[ctrl.value];

          ctrl.render();
          if(ctrl.value == "active"){
            showElement('.note-y-2', false)
            showElement('.paper-yellow-2', true)
           
            
          }  
        },
        mousedown: function () {
          let ctrl = this;
          ctrl.render();
          if(ctrl.value == "active"){
            showElement('.note-y-2', false)
            showElement('.paper-yellow-2', true)
          
          } 
        },
        render: function () {
          const ctrl = this;
          showElement('.note-y-2', true)
            showElement('.paper-yellow-2', false)
          showElement(`.${ctrl.id}`, false);
          showElement(`#${ctrl.id}-${ctrl.value}`, true);
        },
      }),
     

      ctrl_show_yellow2: new Control({
        type: "button",
        id: "btn-show-z",
        value: "inactive",
        event_for_active_state: true,
        ignore_mouseup: true,
        mouseup: function () {
          const ctrl = this;
          ctrl.value = {
            active: "inactive",
            inactive: "active",
          }[ctrl.value];

          ctrl.render();
          if(ctrl.value == "active"){
            showElement('.note-y-2', false)
            showElement('.paper-yellow-2', true)
            showElement('#btn-show-y-active', true)
          }  
        },
        mousedown: function () {
          let ctrl = this;
          ctrl.render();
          if(ctrl.value == "active"){
            showElement('.note-y-2', false)
            showElement('.paper-yellow-2', true)
            showElement('#btn-show-y-active', true)
          } 
        },
        render: function () {
          const ctrl = this;
          showElement('.note-y-2', true)
            showElement('.paper-yellow-2', false)
            showElement('#btn-show-y-active', false)
          showElement(`.${ctrl.id}`, false);
          showElement(`#${ctrl.id}-${ctrl.value}`, true);
        },
      }),


      ctrl_drag_col: new Control({
        type: "drag",
        id: "drag-col",
        is_dynamic: false,
        event_for_active_state: true,
        ignore_mouseup: true,
        value1: 0,
        
        fn_drag: function ({ value, eventName }) {
          let ctrl = this;  
          if (eventName == "mousedown") {         
            ctrl.offset = ctrl.curPos;
            ctrl.is_snap = false;
            ctrl.snap_idx = -1;
            ctrl.y1 = sliderX;          
          } else if (["mousemove", "mouseup"].indexOf(eventName) > -1) {
            let dx = ctrl.curPos.x - ctrl.offset.x;
            let prevValue = ctrl.value1 || 0;
            ctrl.value1 += dx;
            let scope = [0, 280];
            if (ctrl.value1 < scope[0]) ctrl.value1 = scope[0];
            if (ctrl.value1 > scope[1]) ctrl.value1 = scope[1];
            ctrl.offset.x += ctrl.value1 - prevValue;
          }
          ctrl.render();
        },

        render: function () {
          let ctrl = this;
          console.log("offset",ctrl.value1)
          // var value = Math.round(event.clientX / window.innerWidth * 10);
          // ctrl.y1.value = value;
          $(".columnCount").css('transform',`translate(${ctrl.value1  || 0}px, 20px)`)
          getEl(".paper-yellow-1").attr(
            "transform",
            `translate(${ctrl.value1 - 291 || 0} -1)`
          ); 
          getEl(".note-y-1").attr(
            "transform",
            `translate(${ctrl.value1 - 40  || 0} -50)`
          ); 
          updateSquares();
        },
      }),
      ctrl_drag_col_1: new Control({
        type: "drag",
        id: "drag-col-1",
        is_dynamic: false,
        event_for_active_state: true,
        ignore_mouseup: true,
        value1: 0,

        fn_drag: function ({ value, eventName }) {
          let ctrl = this;

          if (eventName == "mousedown") {
            ctrl.offset = ctrl.curPos;
            ctrl.is_snap = false;
            ctrl.snap_idx = -1;
            
          } else if (["mousemove", "mouseup"].indexOf(eventName) > -1) {
            let dx = ctrl.curPos.x - ctrl.offset.x;
            let prevValue = ctrl.value1 || 0;
            ctrl.value1 += dx;

            let scope = [0, 280];
            if (ctrl.value1 < scope[0]) ctrl.value1 = scope[0];
            if (ctrl.value1 > scope[1]) ctrl.value1 = scope[1];
            ctrl.offset.x += ctrl.value1 - prevValue;
            
          }
          
          ctrl.render();
        },

        render: function () {
          
          let ctrl = this;
          console.log(ctrl.value1)
          $(".rowCount").css('transform',`translate(${ctrl.value1  || 0}px, 20px)`)
          getEl(".paper-yellow-2").attr(
            "transform",
            `translate(${ctrl.value1 - 201 || 0} -1)`
          );  
          getEl(".note-y-2").attr(
            "transform",
            `translate(${ctrl.value1 - 40  || 0} 15)`
          ); 
        }
      }),
      ctrl_drag_col_2: new Control({
        type: "drag",
        id: "drag-col-2",
        is_dynamic: false,
        event_for_active_state: true,
        ignore_mouseup: true,
        value1: 0,

        fn_drag: function ({ value, eventName }) {
          let ctrl = this;

          if (eventName == "mousedown") {
            ctrl.offset = ctrl.curPos;
            ctrl.is_snap = false;
            ctrl.snap_idx = -1;
          } else if (["mousemove", "mouseup"].indexOf(eventName) > -1) {
            let dx = ctrl.curPos.x - ctrl.offset.x;
            let prevValue = ctrl.value1 || 0;
            ctrl.value1 += dx;

            let scope = [0, 280];
            if (ctrl.value1 < scope[0]) ctrl.value1 = scope[0];
            if (ctrl.value1 > scope[1]) ctrl.value1 = scope[1];
            ctrl.offset.x += ctrl.value1 - prevValue;
          }

          ctrl.render();
        },

        render: function () {
          let ctrl = this;
          $(".columnCountRed").css('transform',`translate(${ctrl.value1  || 0}px, 20px)`) 
          getEl(".note-r-1").attr(
            "transform",
            `translate(${ctrl.value1 + 460  || 0} -50)`
          ); 
          updateSquaresRed();
        },
      }),
      ctrl_drag_col_3: new Control({
        type: "drag",
        id: "drag-col-3",
        is_dynamic: false,
        event_for_active_state: true,
        ignore_mouseup: true,
        value1: 0,

        fn_drag: function ({ value, eventName }) {
          let ctrl = this;

          if (eventName == "mousedown") {
            ctrl.offset = ctrl.curPos;
            ctrl.is_snap = false;
            ctrl.snap_idx = -1;
          } else if (["mousemove", "mouseup"].indexOf(eventName) > -1) {
            let dx = ctrl.curPos.x - ctrl.offset.x;
            let prevValue = ctrl.value1 || 0;
            ctrl.value1 += dx;

            let scope = [0, 280];
            if (ctrl.value1 < scope[0]) ctrl.value1 = scope[0];
            if (ctrl.value1 > scope[1]) ctrl.value1 = scope[1];
            ctrl.offset.x += ctrl.value1 - prevValue;
          }

          ctrl.render();
        },

        render: function () {
          let ctrl = this;
          $(".rowCountRed").css('transform',`translate(${ctrl.value1  || 0}px, 20px)`) 
          getEl(".note-r-2").attr(
            "transform",
            `translate(${ctrl.value1 + 460  || 0} 15)`
          ); 
        },
      }),
    },

    fnCalculateShapePoints: function (points, point_number) {
      let u = _(points.split(" "))
        .chunk(2)
        .value()
        .map((x) => new Point3D(Number(x[0]), Number(x[1]), 0))
        .slice(-point_number);
      console.log(JSON.stringify(u));
    },

    setDeleteMode: function (mode) {
      g_state.delete_mode = !!mode;
      g_state.mode_draw = "";
      g_state_controls
        .filter((x) => x.mark == "mode-draw")
        .forEach((c) => {
          c.value = "inactive";
          c.render();
        });
      console.log("set delete mode", g_state.delete_mode);
      showElement(".draw-line-ruler", !g_state.delete_mode);
    },
  };

  g_state_controls = Object.keys(g_state.controls).map((k) => {
    let ctrl = g_state.controls[k];
    ctrl.name = k;

    return ctrl;
  });

  Object.keys(g_state.menu_data).forEach((k) => {
    g_state.menu_data[k].line_delete = [];
    g_state.menu_data[k].line_delete_origin = [];
  });
  g_default_state = JSON.parse(JSON.stringify(g_state));
};

const loadConfigAndStaticSVG = () => {
  console.log("version", g_state.c_version);
};

$(document).ready(function () {
  console.log(+new Date(), "document ready s.js");

  setTimeout(async () => {
    initDragEvent(_.flattenDeep(["Mycanvas"]));

    initPallet();
    await delay(100);

    initMain();
    await delay(100);

    showElement("#divBody, #stage_0", true).css("opacity", "1");
  }, 100);
});


  var svgContainer = document.getElementById('square-yellow');
  var columnCountSpan = document.getElementById('columnCount');
  var rowCountSpan = document.getElementById('rowCount');
  var sliderX = document.getElementById('drag-col');
  var sliderY = document.getElementById('drag-col-1');
  var columnCount = 1;
  var rowCount = 1;
  var dragging = false;
  // Tạo lưới ô vuông ban đầu
  createGrid(columnCount, rowCount);

  // Cập nhật số cột và số hàng khi thanh trượt thay đổi
  function updateSquares() {
    columnCount = parseInt(sliderX.value/20, 10);
    rowCount = parseInt(sliderY.value/20, 10);

    columnCountSpan.innerText = columnCount;     
    rowCountSpan.innerText = rowCount;
    // Xóa ô vuông hiện tại
    clearGrid();

    // Tạo lại lưới ô vuông mới
    createGrid(columnCount, rowCount);
  }

  // Tạo lưới ô vuông
  function createGrid(columns, rows) {
    svgContainer.innerHTML = '';

    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
        var x = i * 30; // Kích thước ô vuông + margin
        var y = j * 30;

        var square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        square.setAttribute('x', x + 112);
        square.setAttribute('y', y + 188);
        square.setAttribute('width', 30);
        square.setAttribute('height', 30);
        square.setAttribute('class', 'square');
        square.setAttribute("fill", "#fcead4");
        square.setAttribute("stroke", "#f2be22");
        square.setAttribute("stroke-width", "2");
        square.setAttribute("stroke-miterlimit", "10");
        svgContainer.appendChild(square);
      }
    }
  }

  // Xóa lưới ô vuông hiện tại
  function clearGrid() {
    svgContainer.innerHTML = '';
  }
  
  var svgContainerRed = document.getElementById('square-red');
  var columnCountSpanRed = document.getElementById('columnCountRed');
  var rowCountSpanRed = document.getElementById('rowCountRed');
  var sliderXRed = document.getElementById('drag-col-2');
  var sliderYRed = document.getElementById('drag-col-3');
  var columnCountRed = 1;
  var rowCountRed = 1;
  
  // Tạo lưới ô vuông ban đầu
  createGridRed(columnCount, rowCount);

  // Cập nhật số cột và số hàng khi thanh trượt thay đổi
  function updateSquaresRed() {
    columnCount = parseInt(sliderXRed.value/20, 10);
    rowCount = parseInt(sliderYRed.value/20, 10);

    columnCountSpanRed.innerText = columnCount;     
    rowCountSpanRed.innerText = rowCount;
    // Xóa ô vuông hiện tại
    clearGridRed();

    // Tạo lại lưới ô vuông mới
    createGridRed(columnCount, rowCount);
  }

  // Tạo lưới ô vuông
  function createGridRed(columns, rows) {
    svgContainerRed.innerHTML = '';

    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
        var x = i * 30; // Kích thước ô vuông + margin
        var y = j * 30;

        var square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        square.setAttribute('x', x + 612);
        square.setAttribute('y', y + 188);
        square.setAttribute('width', 30);
        square.setAttribute('height', 30);
        square.setAttribute('class', 'square');
        square.setAttribute("fill", "#fcdbd8");
        square.setAttribute("stroke", "#f24c3d");
        square.setAttribute("stroke-width", "2");
        square.setAttribute("stroke-miterlimit", "10");
        svgContainerRed.appendChild(square);
      }
    }
  }

  // Xóa lưới ô vuông hiện tại
  function clearGridRed() {
    svgContainerRed.innerHTML = '';
  }
 