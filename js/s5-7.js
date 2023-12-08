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
     

      ctrl:new Control({
        name: "btn-show-line",
        type: "button",
        id: "btn-show-line",
        value: "inactive",
        event_for_active_state: true,
        ignore_mouseup: true,

        mouseup: function () {
            const ctrl = this;
            g_state.show_popup = false;
            getControl("btn-show-popup").render();
            ctrl.value = {
                active: "inactive",
                inactive: "active",
            }[ctrl.value];
            ctrl.render();
           
           if(ctrl.value == "inactive" ){
            $("#content-H").css("display", "block");
           }
           if(ctrl.value == "inactive" ){
            $("#content-H1").css("display", "none");
           }
            
        //    getEl(`#content-H`).attr("display", `block`);
          
         
        },
        mousedown: function () {},

        render: function () {
            const ctrl = this;
            
            showElement(`#container-boxer`, ctrl.value == "inactive");

            showElement(`.${ctrl.id}`, false);
            showElement(`#${ctrl.id}-${ctrl.value}`, true);

        },
    }),

    ctrl1:new Control({
      name: "content-box-1",
      type: "drag",
      id: "content-box-1",
      x_scope: [0, 1],
      scope: [0, 1],
      minimum: 0.001,
      value: 0,
      info: popupInfo,
      fn_drag: function ({ value, eventName }) {
          let ctrl = this;
          ctrl.eventName = eventName;

          if (eventName == "mousedown") {
              ctrl.offset = {
                  x: ctrl.curPos.x,
                  y: ctrl.curPos.y,
              };

              ctrl.translate = SVGLib.getTranslate(getEl(`#content-box-${1}`));

              // }
          } else {
              ctrl.render();
          }

          if (eventName == "mouseup") {
              delete ctrl.offset;
          }

      },

      render: function () {
          let ctrl = this;
          if (ctrl.offset) {
              let { translate } = ctrl;

              if (!ctrl.scopeTx) {
                  let width = 75;
                  let height = 75;

                  let initX = 18;
                  let initY = 18;

                  let minVisibleX = 0.5 * 75;

                  let minVisibleY = 0.5 * 75;

                  console.log(minVisibleX);
                  console.log(minVisibleY);

                  let scopeTx = [-width + minVisibleX - initX, 350 - minVisibleX - initX];
                  let scopeTy = [-height + minVisibleY - initY, 350 - initY - minVisibleY];

                  ctrl.scopeTx = scopeTx;
                  ctrl.scopeTy = scopeTy;
              }

              let { scopeTx, scopeTy } = ctrl;

              // var layoutLoc = SVGLib.getTranslate("#line-draw");

              // x: t,
              // y: y0 + (y1 - y0) / (x1 - x0) * (t - x0)

              let x0 = 622.82;
              let y0 = 622;
              let x1 = 1060.07;
              let y1 = 1060;;

              let tx = ctrl.curPos.x - ctrl.offset.x + translate.left;
              let ty = ctrl.curPos.y - ctrl.offset.y + translate.top;

              let tx_point = tx;
              let ty_point = y0 + ((y1 - y0) / (x1 - x0)) * (tx - x0);

              let isMeetBounding = false;
              if (tx_point > scopeTx[1]) {
                  isMeetBounding = true;
                  tx_point = scopeTx[1];
                  // console.log("meet bounding tx_point max");
              }
              if (tx_point < scopeTx[0]) {
                  isMeetBounding = true;
                  tx_point = scopeTx[0];
                  // console.log("meet bounding tx_point min");
              }

              if (ty_point > scopeTy[1]) {
                  isMeetBounding = true;
                  ty_point = scopeTy[1];
                  // console.log("meet bounding ty_point min");
              }
              if (ty_point < scopeTy[0]) {
                  isMeetBounding = true;
                  ty_point = scopeTy[0];
                  // console.log("meet bounding ty_point max");
              }

              getEl(`#content-box-${1}`).attr("transform", `translate(${tx_point} ${ty_point})`);
              getEl(`#content-circle`).attr("transform", `translate(${tx_point - 20.403457641601562} ${ty_point +49.59585032127734})`);
              getEl(`#content-H`).attr("transform", `translate(${tx_point - 38.15} ${ty_point - -23.5})`);

              let arrayLine = {
                  x1: -175,
                  y1: 90,
                  x2: tx_point - 10,
                  y2: ty_point + 58,
                  name: "EH",
              };

              let arrayLine_2 = {
                  x1: 108,
                  y1: 352.8,
                  x2: tx_point - 10,
                  y2: ty_point + 58,
                  name: "GH",
              };

              EditLine(arrayLine_2);

              EditLine(arrayLine);

              let arrayPolygon = {
                  x: tx_point + 522.5,
                  y: ty_point + 282.5,
              };
              EditPolygon(arrayPolygon);
          }
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

//   const resetCoorBox = () => {
//     for (let i = 1; i <= 17; i++) {
//         $.each(coor_allBox, function (key, value) {
//             if (i == key) {
//                 getEl(`#content-box-${i}`).attr("transform", `translate(${value.x} ${value.y})`);
//             }
//         });
//     }
    // getEl(`#content-H`).attr("transform", `translate(80 140)`);
    
//         // $("#content-H1").css("display", "block");
//         // getEl(`#content-H1`).attr("transform", `translate(13 145)`);
//         // $("#content-H").css("display", "none");
//         // getEl(`#content-H`).attr("transform", `translate(80 140)`);
//     getEl(`#content-circle`).attr("transform", `translate(97.79008483886719 166.1038242639765)`);

//     let arrayLine = {
//         x1: -175,
//         y1: 90,
//         x2: 160.5,
//         y2: 175,
//         name: "EH",
//     };

//     let arrayLine_2 = {
//         x1: 108,
//         y1: 352.8,
//         x2: 108,
//         y2: 175,
//         name: "GH",
//     };
//     let arrayPolygon = {
//         x: 797.47,
//         y: 241.99,
//     };

//     EditLine(arrayLine_2);

//     EditLine(arrayLine);

//     EditPolygon(arrayPolygon);
// };
function EditLine(arayLine) {
  $(`#line-${arayLine.name}`).attr({
      x1: arayLine.x1,
      y1: arayLine.y1,
      x2: arayLine.x2,
      y2: arayLine.y2,
  });
}
// mafu cam 
function EditPolygon(arayPolygon) {
  $(`#triangle-color`).attr({
      points: `472.5 160.5 ${arayPolygon.x},${arayPolygon.y} 312.74 402,417.79 `,
  });
}
// line 
// const createLine = () => {
//   let lineEH = $(
//       SVGLib.createTag("line", {
//           x1: -157,
//           y1: 90,
//           x2: 109,
//           y2: 175,
//           id: "line-EH",
//           style: `fill: none; stroke: #000; stroke-linejoin: round; stroke-width: 4px;`,
//       })
//   );

//   let lineGH = $(
//       SVGLib.createTag("line", {
//           x1: 108,
//           y1: 352.8,
//           x2: 108,
//           y2: 175,
//           id: "line-GH",
//           style: `fill: none; stroke: #000; stroke-linejoin: round; stroke-width: 4px;`,
//       })
//   );

//   $(`#create-line`).append(lineEH);
//   $(`#create-line`).append(lineGH);
// };
$(document).ready(function () {
  createLine();

  initState();
  loadConfigAndStaticSVG();
  // if (g_state.is_init_canvas) initCanvas();
  initDragEvent(_.flattenDeep(["Mycanvas"]));

  $(window).resize(function () {
      fnCalculateSVGRatio();
  });
  fnCalculateSVGRatio();

  let dZoom = 0.1;
  let isPinch = false;
  let isMouseDownZoomArea = false;

  let prevPos = {
      x: 0,
      y: 0,
  };

  var svg = document.querySelector("svg");
  // Create an SVGPoint for future math
  var pt = svg.createSVGPoint();

  function cursorPoint(evt) {
      var c = /Edge/.test(window.navigator.userAgent) ? document.getElementById("svg") : svg;
      pt.x = evt.clientX || evt.x || 0;
      pt.y = evt.clientY || evt.y || 0;
      var ctm = c.getScreenCTM();
      var inverse = ctm.inverse();
      var p = pt.matrixTransform(inverse);

      let ratio = 1;
      let isChrome = !!navigator.userAgent.match(/Chrome/i) || window.chrome;

      if (getEl("#stage_1").length && !isChrome) {
          let stg1El = getEl("#stage_1")[0];
          let scale = stg1El.getBoundingClientRect().width / stg1El.offsetWidth;
          if (scale) {
              ratio = 1 / scale;

              console.log("scale", scale);
          }
      }

      return {
          x: p.x * ratio,
          y: p.y * ratio,
      };
  }

  window.cursorPoint = cursorPoint;

  // var svg = document.querySelector("svg");
  // // Create an SVGPoint for future math
  // var pt = svg.createSVGPoint();

  // const fnControlScrollbar = (ctrl) => {
  //     const el = $(`#${ctrl.id}`);
  //     const scrollPoint = $(ctrl.scroll_point);
  //     let isDrag = false;
  //     let prevValue = null;

  //     let fnDrag = (event, isSnap, eventName) => {
  //         g_latestMousePress = ctrl.id;
  //         event.stopPropagation();

  //         const [x0, x1] = ctrl.x_scope || [];
  //         const [y0, y1] = ctrl.y_scope || [];

  //         var layoutLoc = SVGLib.getTranslate(el);
  //         var curPos = cursorPoint(event);

  //         var x = curPos.x - layoutLoc.left;
  //         var y = -(curPos.y - layoutLoc.top);

  //         let percent = (x - x0) / (x1 - x0);
  //         if (ctrl.y_scope) {
  //             percent = (y1 - Math.abs(y)) / (y1 - y0);
  //         }

  //         if (percent < 0) percent = 0;
  //         if (percent > 1) percent = 1;

  //         let roundLength = _.get(ctrl.minimum.toString().split(".")[1], "length", 0);

  //         ctrl.value =
  //             // ctrl.scope[0] +
  //             _.round(percent * (ctrl.scope[1] - ctrl.scope[0]) + ctrl.scope[0], roundLength);

  //         if (ctrl.value < ctrl.scope[0]) ctrl.value = ctrl.scope[0];
  //         if (ctrl.value > ctrl.scope[1]) ctrl.value = ctrl.scope[1];

  //         const stopPoints = ctrl.snap_point || [];
  //         const stopValue = stopPoints.find((x) => Math.abs(ctrl.value - x) < 1.2 * ctrl.minimum);
  //         if (stopValue != undefined) {
  //             ctrl.value = stopValue;
  //         } else if (isSnap) {
  //             ctrl.value = _.round(_.round(ctrl.value / ctrl.minimum) * ctrl.minimum, roundLength);
  //         }

  //         if (eventName == "mousedown") {
  //             prevValue = ctrl.value;
  //         }

  //         ctrl.render();

  //         if (ctrl.fn_drag)
  //             ctrl.fn_drag({
  //                 prevValue,
  //                 eventName,
  //             });

  //         if (eventName == "mousemove") {
  //             prevValue = ctrl.value;
  //         }

  //         keepScrollBarNotMove(el);
  //     };

  //     $(el)
  //         .on("mousedown", function (event) {
  //             isDrag = true;
  //             prevValue = null;
  //             fnDrag(event, true, "mousedown");
  //         })
  //         .css("position", "absolute");

  //     $(document).on("mousemove", function (event) {
  //         if (isDrag) {
  //             fnDrag(event, false, "mousemove");
  //             keepScrollBarNotMove(el);
  //         }
  //     });

  //     $(document).on("mouseup", function (event) {
  //         if (isDrag) {
  //             fnDrag(event, true, "mouseup");
  //             keepScrollBarNotMove(el);
  //             isDrag = false;
  //             prevValue = null;
  //         }
  //     });
  // };

  // const fnControlDrag = (ctrl) => {
  //     console.log("fnControlDrag initial", ctrl.name);
  //     let elSelector = ctrl.id ? `#${ctrl.id}` : `.${ctrl.class}`;
  //     let el = $(elSelector);
  //     let isDrag = false;
  //     let prevValue = null;

  //     ctrl.init_el = el;

  //     let prev = { x: 0, y: 0 };
  //     let fnDrag = (event, isSnap, eventName, isKeepCheckDist) => {
  //         g_latestMousePress = ctrl.id || ctrl.class;
  //         console.log("fnDrag", ctrl.name);
  //         event.stopPropagation();

  //         const [x0, x1] = ctrl.x_scope || [];
  //         const [y0, y1] = ctrl.y_scope || [];

  //         var layoutLoc = SVGLib.getTranslate(el);
  //         // console.log("layoutLoc", layoutLoc);
  //         var curPos = cursorPoint(event);

  //         var x = curPos.x - layoutLoc.left;
  //         var y = curPos.y - layoutLoc.top;

  //         ctrl.curPos = curPos;

  //         let dx = event.clientX - prev.x;
  //         let dy = event.clientY - prev.y;
  //         if (!isKeepCheckDist && Math.pow(dx, 2) + Math.pow(dy, 2) < 5) return;

  //         prev = {
  //             x: event.clientX,
  //             y: event.clientY,
  //         };

  //         if (x < x0) x = x0;
  //         else if (x > x1) x = x1;

  //         if (y < y0) y = y0;
  //         else if (y > y1) y = y1;

  //         ctrl.value = { x, y };

  //         if (eventName == "mousedown") {
  //             prevValue = ctrl.value;
  //         }

  //         // console.log(ctrl.name, ctrl.value);

  //         ctrl.render();

  //         if (ctrl.fn_drag)
  //             ctrl.fn_drag({
  //                 prevValue,
  //                 eventName,
  //             });

  //         if (eventName == "mousemove") {
  //             prevValue = ctrl.value;
  //         }

  //         // console.log("prevValue", prevValue, eventName);

  //         keepScrollBarNotMove(el);
  //     };

  //     if (ctrl.is_dynamic) {
  //         $(document).on("mousedown", elSelector, function (event) {
  //             ctrl.id = $(this).attr("id");
  //             ctrl.el = this;

  //             isDrag = true;
  //             prevValue = null;
  //             ctrl.is_drag = false;
  //             ctrl.is_drag_real = false;

  //             fnDrag(event, true, "mousedown", true);
  //             prev = { x: 0, y: 0 };
  //         });
  //     } else {
  //         $(el)
  //             .on("mousedown", function (event) {
  //                 ctrl.id = $(this).attr("id");
  //                 ctrl.el = this;

  //                 isDrag = true;
  //                 prevValue = null;
  //                 ctrl.is_drag = false;
  //                 ctrl.is_drag_real = false;

  //                 fnDrag(event, true, "mousedown", true);
  //                 prev = { x: 0, y: 0 };
  //             })
  //             .css("position", "absolute");
  //     }

  //     let prevMove = { x: 0, y: 0 };
  //     $(document).on("mousemove", function (event) {
  //         if (isDrag) {
  //             let dx = event.clientX - prevMove.x;
  //             let dy = event.clientY - prevMove.y;
  //             if (Math.pow(dx, 2) + Math.pow(dy, 2) < 5) return;

  //             ctrl.is_drag = true;
  //             ctrl.is_drag_real = true;

  //             fnDrag(event, false, "mousemove");
  //             keepScrollBarNotMove(el);
  //             prevMove = {
  //                 x: event.clientX,
  //                 y: event.clientY,
  //             };
  //         } else if (ctrl.mousemove) {
  //             let dx = event.clientX - prevMove.x;
  //             let dy = event.clientY - prevMove.y;
  //             if (Math.pow(dx, 2) + Math.pow(dy, 2) < 5) return;
  //             ctrl.mousemove(event);

  //             prevMove = {
  //                 x: event.clientX,
  //                 y: event.clientY,
  //             };
  //         }
  //     });

  //     // $(document).on("mouseup", function (event) {
  //     //     if (isDrag) {
  //     //         fnDrag(event, true, "mouseup", true);
  //     //         keepScrollBarNotMove(el);
  //     //         isDrag = false;
  //     //         prevValue = null;
  //     //         ctrl.is_drag = false;
  //     //         delete ctrl.el;
  //     //     }
  //     // });
  //     // if (ctrl.mouseover) {
  //     //     $(el).on("mouseenter", function (event) {
  //     //         ctrl.mouseover(event);
  //     //         ctrl.is_hover = true;
  //     //     });
  //     // }
  //     // if (ctrl.mouseout) {
  //     //     $(el).on("mouseleave", function (event) {
  //     //         ctrl.mouseout(event);
  //     //         ctrl.is_hover = false;
  //     //     });
  //     // }
  // };

  // const fnControlRadio = (ctrl) => {
  //     console.log("fnControlRatio initial", ctrl.name);
  //     let el = $(`#${ctrl.id}`);
  //     $(el).on("mousedown", function (event) {
  //         event.preventDefault();
  //         if (!ctrl.ignore_event_tracking) g_eventId += 1;
  //         g_latestMousePress = ctrl.id;

  //         if (ctrl.mousedown) ctrl.mousedown();
  //     });
  // };

  // const fnControlClickable = (ctrl) => {
  //     console.log("fnControlClickable initial", ctrl.name);
  //     let el = $(ctrl.id ? `#${ctrl.id}` : `.${ctrl.class}`);
  //     $(el).on("mousedown", function (event) {
  //         ctrl.id = $(this).attr("id");
  //         event.preventDefault();
  //         if (!ctrl.ignore_event_tracking) g_eventId += 1;
  //         g_latestMousePress = ctrl.id || ctrl.class;

  //         if (ctrl.mousedown) ctrl.mousedown();
  //     });
  // };

  // const fnControlCheckbox = (ctrl) => {
  //     console.log("fnControlCheckbox initial", ctrl.name);
  //     let el = $(`#${ctrl.id}`);
  //     $(el).on("mousedown", function (event) {
  //         event.preventDefault();
  //         if (!ctrl.ignore_event_tracking) g_eventId += 1;
  //         g_latestMousePress = ctrl.id;

  //         if (ctrl.mousedown) ctrl.mousedown();
  //     });
  // };
  // const fnControlButton = (ctrl) => {
  //     console.log(
  //         "fnControlButton initial",
  //         ctrl.is_group
  //             ? Object.keys(ctrl.flow_member)
  //                   .map((x) => `${ctrl.name}-${x}`)
  //                   .join(", ")
  //             : ctrl.name
  //     );

  //     let buttons = [];
  //     if (ctrl.is_group) {
  //         buttons = [
  //             ...Object.keys(ctrl.flow_member).map((x) => `#${ctrl.id}-${x}-inactive`), // inactive state
  //             ...(ctrl.event_for_active_state ? Object.keys(ctrl.flow_member).map((x) => `#${ctrl.id}-${x}-active`) : []), // active state
  //         ].filter((x) => x);
  //     } else {
  //         buttons = [`#${ctrl.id}-inactive`];
  //         if (ctrl.event_for_active_state) {
  //             buttons.push(`#${ctrl.id}-active`);
  //         }
  //     }

  //     let els = $(buttons.join(", "));

  //     // els.on("mousedown", function (e) {
  //     //     if (!ctrl.ignore_event_tracking) g_eventId += 1;
  //     //     let currentEventId = g_eventId;
  //     //     g_latestMousePress = ctrl.id;
  //     //     ctrl.from_state = ctrl.value;
  //     //     // ctrl.value = "active";
  //     //     ctrl.render();

  //     //     if (ctrl.type == "button" && ctrl.from_state == "active" && ctrl.event_for_active_state) {
  //     //         // do nothing
  //     //     } else {
  //     //         animateButtonEffect(`#${ctrl.id}-group`, true, null, 0);
  //     //     }

  //     //     if (ctrl.allow_press) {
  //     //         let { mouse_press_delay } = ctrl;
  //     //         let itvPress;
  //     //         let count = 0;
  //     //         let fn = () => {
  //     //             count += 1;
  //     //             if (currentEventId != g_eventId) {
  //     //                 clearInterval(itvPress);

  //     //                 return;
  //     //             }
  //     //             ctrl.fn_mouseup({ isKeyPress: true, count });
  //     //         };

  //     //         setTimeout(() => {
  //     //             if (currentEventId == g_eventId) {
  //     //                 g_isPressMouse = true;
  //     //                 fn();
  //     //                 itvPress = setInterval(fn, mouse_press_delay);
  //     //             }
  //     //         }, 1000);
  //     //     }

  //     //     if (ctrl.mousedown) ctrl.mousedown();
  //     // });
  // };

  // g_state.controls.forEach((ctrl) => {
  //     switch (ctrl.type) {
  //         case "scrollbar":
  //             fnControlScrollbar(ctrl);
  //             break;

  //         case "drag":
  //             fnControlDrag(ctrl);
  //             break;

  //         case "radio":
  //             fnControlRadio(ctrl);

  //             break;

  //         case "checkbox":
  //             fnControlCheckbox(ctrl);
  //             break;

  //         case "button":
  //             fnControlButton(ctrl);
  //             break;

  //         case "clickable":
  //             fnControlClickable(ctrl);
  //             break;

  //         default:
  //             break;
  //     }

  //     if (ctrl.render) ctrl.render();
  // });

  // applyControlChange(true);

  // $(document).on("mouseup", async function (e) {
  //     g_isMouseDown = false;
  //     console.log("g_latestMousePress mouseup", g_latestMousePress);

  //     let fn = () => {
  //         let ctrl = g_state.controls.find((c) => c.id == g_latestMousePress || c.class == g_latestMousePress);
  //         if (ctrl) {
  //             if (!ctrl.ignore_event_tracking) g_eventId += 1;
  //             if (!ctrl.ignore_mouseup) {
  //                 if (ctrl.type == "button") {
  //                     if (ctrl.is_group) {
  //                         ctrl.value = "inactive";
  //                         ctrl.value1 = ctrl.flow_member[ctrl.value1];
  //                         ctrl.render();
  //                     } else {
  //                         ctrl.value = "disabled";
  //                         ctrl.render();
  //                     }

  //                     if (ctrl.mouseup_immediately) ctrl.mouseup_immediately();

  //                     // animateButtonEffect(
  //                     //     `#${ctrl.id}-group`,
  //                     //     false,
  //                     //     function () {
  //                     //         ctrl.value = "inactive";
  //                     //         ctrl.render();

  //                     //         if (ctrl.mouseup) ctrl.mouseup(e);
  //                     //     },
  //                     //     0
  //                     // );
  //                     if (ctrl.mouseup) ctrl.mouseup(e);
  //                 } else if (ctrl.mouseup) ctrl.mouseup(e);
  //             } else if (ctrl.type == "button" && ctrl.event_for_active_state) {
  //                 ctrl.mouseup(e);
  //             }
  //         }

  //         g_latestMousePress = "";
  //         g_isPressMouse = false;

  //         console.log("g_latestMousePress mouseup", g_latestMousePress);
  //     };

  //     if (
  //         (!g_latestMousePress ||
  //             (g_latestMousePress && g_latestMousePress != "btn-show-popup" && g_latestMousePress.indexOf("drag-popup") == -1)) &&
  //         g_state.show_popup
  //     ) {
  //         g_state.show_popup = false;
  //         let ctrlShowPopup = getControl("btn-show-popup");
  //         ctrlShowPopup.value = "inactive";
  //         ctrlShowPopup.render();
  //     }

  //     fn();
  // });

  // setTimeout(async () => {
  //     initPallet();
  //     await delay(100);

  //     initMain();
  //     await delay(100);

  //     showElement("#divBody, #stage_0", true).css("opacity", "1");
  // }, 100);
});

// let controlValuesPrev = JSON.stringify({});

// const applyControlChange = (isSkipCache) => {
//   let controlValues = JSON.stringify({
//       ..._.pick(g_state, ["menu", "menu_item_selected", "menu_data"]),
//       controls: g_state.controls.filter((x) => !x.is_skip_check_reload).map((x) => _.pick(x, ["name", "value"])),
//   });

//   if (controlValues == controlValuesPrev && !isSkipCache) {
//       return;
//   }
//   controlValuesPrev = controlValues;

//   console.log("applyControlChange");

//   if (!$(".shape_origin_dash").length) {
//       Object.keys(g_state.menu_data).forEach((k) => {
//           let elItem = getEl(`.select-menu-item-${k}`);
//           let menuData = g_state.menu_data[k];

//           elItem.append(
//               SVGLib.createTag("polygon", {
//                   style: CONFIG.colors.shape_rotate,
//                   class: "shape_view",
//               })
//           );

//           elItem.append(
//               SVGLib.createTag("path", {
//                   d: menuData.points_origin
//                       .map((p, idx) => `${idx == 0 ? "M" : "L"}${p.x} ${p.y}${idx == menuData.points_origin.length - 1 ? "Z" : ""}`)
//                       .join(" "),
//                   style: CONFIG.colors.shape_origin_dash,
//                   class: "shape_origin_dash",
//               })
//           );
//           elItem.append(
//               SVGLib.createTag("polygon", {
//                   style: "fill: transparent",
//                   class: "shape_rotate",
//               })
//           );

//           elItem.append(
//               SVGLib.createTag("circle", {
//                   cx: menuData.center.x,
//                   cy: menuData.center.y,
//                   r: 8,
//                   style: CONFIG.colors.shape_center,
//                   class: "shape_center",
//               })
//           );

//           elItem.append(
//               SVGLib.createTag("line", {
//                   style: CONFIG.colors.shape_angle_line_from,
//                   class: "shape_angle_line_from",
//               })
//           );

//           elItem.append(
//               SVGLib.createTag("line", {
//                   style: CONFIG.colors.shape_angle_line_to,
//                   class: "shape_angle_line_to",
//               })
//           );

//           elItem.append(
//               SVGLib.createTag("polyline", {
//                   style: CONFIG.colors.shape_angle_curve_in,
//                   class: "shape_angle_curve_in",
//               })
//           );
//           elItem.append(
//               SVGLib.createTag("polyline", {
//                   style: CONFIG.colors.shape_angle_curve_in,
//                   class: "shape_angle_curve_out",
//               })
//           );
//           elItem.append(
//               SVGLib.createTag("g", {
//                   class: "lines-drawed",
//               })
//           );
//       });
//   }
// };
 