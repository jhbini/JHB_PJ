
$(() => {


    // 이벤트 대상: .abtn
    // 이벤트 : click() 메서드 사용
    // 양쪽버튼 구분 : .ab1(왼쪽버튼) / .ab2(오른쪽버튼)
    // 변경대상: .slide li
    // 변경내용: 슬라이드의 left값을 이동하여 애니메이션함
    let slide = $(".slide li"); // li까지 선택함

    // 광클 금지상태변수
    let prot = 0; 

    // 애니메이션 시간변수
    const aniT = 800;

    // 애니메이션 이징변수
    const aniE = "easeOutQuint";

    // 페이드기능을 위한 초기화 설정
    slide.hide().first().show();

    // 현재 슬라이드 순번 변수
    let sno = 0;


    // 버튼 클릭 설정 ////////////
    $(".abtn").click(function () {

        // 광클금지 //////
        if (prot) return;
        prot = 1; // 잠금
        setTimeout(() => prot = 0, aniT);

        // 자동넘김 지우기함수 호출
        clearAuto();

        // 오른쪽
        let isR = $(this).is(".ab2");
        if (isR) { // 오른쪽버튼

            // 현재슬라이드 숨기기
            slide.eq(sno).fadeOut(aniT, aniE);
            // 슬라이드 순번 1증가
            sno++;
            // 슬라이드 한계값체크 처음으로
            if (sno === slide.length) sno = 0;
            // slide.length는 li개수
            // console.log("현재슬번"), sno;
            // 다음순번 슬라이드 보이기
            slide.eq(sno).fadeIn(aniT, aniE);

        } ////////////// if //////////////
        else { // 왼쪽버튼

            // 현재슬라이드 숨기기
            slide.eq(sno).fadeOut(aniT, aniE);
            // 슬라이드 순번 1증가
            sno--;
            // 슬라이드 한계값체크 처음으로
            if (sno === -1) sno = slide.length - 1;
            // slide.length는 li개수
            console.log("현재슬번"), sno;
            // 다음순번 슬라이드 보이기
            slide.eq(sno).fadeIn(aniT, aniE);
        } //////////////// else /////////

    }); ///////////// click //////////////


    // 인터발용 변수
    let autoI;

    // 타임아웃용변수
    let autoT;

    // 인터발 최초호출
    autoSlide();

    // 인터발 호출함수////////
    function autoSlide() {

        autoI = setInterval(() => {
            // 현재슬라이드 숨기기
            slide.eq(sno).fadeOut(aniT, aniE);
            // 슬라이드 순번 1증가
            sno++;
            // 슬라이드 한계값체크 처음으로
            if (sno === slide.length) sno = 0;

            // 다음순번 슬라이드 보이기
            slide.eq(sno).fadeIn(aniT, aniE);

        }, 5000); ///// 인터발함수 /////


    } //////////// autoSlide함수 ////////

    /// 인터발 지우기 함수 /////
    function clearAuto() {
        // 인터발 지우기
        clearInterval(autoI);
        // 타임아웃지우기(실행쓰나미방지)
        clearTimeout(autoT);

        // 일정시간 후 다시 인터발 호출
        autoT = setTimeout(autoSlide, 4000);

    } ///////// clearAuto 함수 ///////////////


}); ///////////////////// jQB ///////////////////
////////////////////////////////////////////////


$(() => {

    // 1. 드래그 대상: .bd
    let move = $(".bd");

    // 스크롤바
    // let scbar = $(".scbar");

    //  박스 드래그설정
    move.draggable({
        axis: "x" 
    });

    // 3. 드래그 애니메이션 설정
    move.css({
        transition: "all .5s ease-out",
        cursor:"grab"
    }); ///////////// css ///////////////

     // -> 첫번째 한계값
     let fpt = 0;

     // 마지막 한계값
     // -> 움직일 박스 전체가로크기
     let lpt = move.width() - $(window).width() + 200;
 
     // 전체바트랙 크기
    //  let barTrk = $('.scroll').width();
    //  // 움직이는 바크기
    //  let bar = scbar.width();
    //  // 전체 차이수
    //  let wgap = barTrk - bar;
     
    //  // 화면크기
    //  let ww = $(window).width();
    //  // 움직이는 박스크기
    //  let tgw = move.width();
    //  // 트랙차이수
    //  let tgap = ww - tgw;
 
     // 비례식
     // 전체차이수 : 전체left = 트랙차이수 : 트랙left
     // 트랙left = 전체left * 트랙차이수 / 전체차이수
     // 트랙left = 전체left * tgap / wgap
    //  console.log(`tgap:${tgap} / wgap:${wgap}`);
 
 
 
     $("html,body")
         .on("mousedown mouseup mousemove", () => {
 
             // 1. 움직이는 박스의 left위치값
             let mpos = move.offset().left;
 
             // 2. 처음 한계값 체크 후 위치고정
             if (mpos > fpt) {
                 // 첫번째 한계값에 고정
                 move.css({
                     left: fpt + "px"
                 }); ////////// css /////////
             } //////////// if /////////////
 
             // 3. 마지막 한계값 체크 후 위치고정
             if (mpos < -lpt) {
                 // 첫번째 한계값에 고정
                 move.css({
                     left: -lpt + "px"
                 }); ////////// css /////////
             } //////////// if /////////////
 
 
             /////////////////////////////////////
             //// 트랙움직이기 ////////////////
             // 비례식
             // 전체차이수 : 전체left = 트랙차이수 : 트랙left
             // 트랙left = 전체left * 트랙차이수 / 전체차이수
             // 트랙left = mpos * tgap / wgap
            //  scbar.css({
            //      left: -(mpos * Math.abs(tgap) / wgap * 0.5 - 200) + "px"
            //  })
 
 
         }); /////////// mousemove /////////////

}) /////////// jQB ////////////////


$(()=> {
    // 이벤트대상 .abtn2
    // 이벤트 : click() 메서드 사용
    // 변경대상 : .exsam
    let slide = $(".exsam");
    // 광클금지
    let prot = 0;
    const aniT = 600;
    const aniE = "easeInOutQuart";

    $(".abtn2").click(function(e){
        e.preventDefault();

        if (prot) return;
        prot = 1;
        setTimeout(() => prot = 0, aniT);

        // 오른쪽 
        let isR = $(this).is(".rb");
        if (isR){
            slide.animate({
                left: "-100%"
            }, // CSS 설정
            aniT, // 시간
            aniE, // 이징
            function () { // 이동후 실행함수
                $(this) // slide 
                    .append($(".exint", this).first())
                    // 첫번째 요소선택 -> 맨뒤로 이동
                    // $(요소,this) -> 나자신 하위요소
                    // first() 첫번째 요소
                    // this 밑에있는 .exint중 첫번째를 맨뒤로 이동시켜라
                    .css({
                        left: "0"
                    });
                // 동시에 left값을 0으로 변경

            }); ///////// animate //////////
        } /////// if ////////////////////////
        else {
            // 왼쪽
            slide.
            prepend(slide.find(".exint").last())
            .css({
                left: "-100%"
            })
            .animate({
                left: "0"
            },
            aniT, // 시간
            aniE // 이징
        ) ///////// animate ///////////
        }//////////////// else /////////
    });
});



$(()=>{
    let scTop;
    // 변경대상: 위로가기버튼(.icon)
    let tbtn = $(".icon");
     // 각 등장액션 위치 배열변수
     const scpos = [];
     // 각 등장액션 요소변수
     const scAct = $(".tit");
     // 각 등장위치 보정값(화면크기 기준)
     const gap = $(window).height();
     // height()는 선택요소의 높이값
     // 참고) width()는 가로값

     // 스크롤 등장요소(.scAct)만 위치값을 배열에 저장
    scAct.each((idx, ele) => { // idx-순번, ele-요소
        // console.log(idx,ele);

        // 위치값 변수에 넣기
        scpos[idx] = $(ele).offset().top;

    }); //////////// each ///////////////
    function scAction(n) { // n - 순번값

        // 해당영역일 경우 해당요소에 클래스 on넣기
        if (
            // 등장요소 위치전 보다 크고
            scTop > scpos[n] - gap &&
            // 등장요소 위치 보다 작음
            scTop < scpos[n]
        ) {
            // 변경대상: .scAct -> scAct변수
            scAct.eq(n).addClass("on");
        } /////////////// if ///////////////////

    } //////////// scAction 함수 /////////////////
    /////////////////////////////////////////////

    // 제이쿼리 메서드 : resize()

    // 등장요소 위치 업데이트 하기 ///////////////
    $(window).resize(() => {
        // 스크롤 등장요소(.scAct)만 위치값을 배열에 저장
        scAct.each((idx, ele) => {
            scpos[idx] = $(ele).offset().top;
        });

        // 위치 배열값 확인
        // console.log(scpos);

    }); /////////////// resize 함수 ////////////

    $(window).scroll(function (e) {
        scTop = $(this).scrollTop();

        scAct.each((idx) => scAction(idx));
         //  위로가기 버튼 보이기/숨기기
         if (scTop >= 300) {
            // 변경대상: .tbtn -> tbtn변수
            tbtn.addClass("on");
        } /////////// if //////////
        else { // 300미만일때
            tbtn.removeClass("on");
        } /////////// else /////////

    }); /////////////// scroll /////////////
    //////////////////////////////////////////

});

$(()=>{
    $(".gnb a, .mognb a").click(function (e) {
        // 기본이동막기
        e.preventDefault();

        // 1. 클릭된 텍스트 읽기
        // this는 클릭된 a요소 자신
        let txt = $(this).text().trim();
        console.log(txt);
        // trim() 문자열 앞뒤공백제거

        // 이동 페이지주소 변수
        let url;

        // 2. 이동버튼에 해당하는 페이지 주소 분기
        switch (txt) {
            case "공연·전시·체험":
                url = "sub1";
                break;
            default:
                url = "etc";
        } ////////// switch case //////////

        // 3. 페이지 이동하기
        // location.href = 주소 -> 페이지이동하기
        if (url === "etc") // 기타일경우
            alert("현재 페이지는 오픈준비중입니다.\n지금은 전시 페이지만 들어가실 수 있습니다.");
        else // 이동페이지일 경우
            location.href = url + ".html";

    }); /////////////////// click ///////////
});

$(()=>{
    $('.hbtn').click((e) => {
        e.preventDefault();
        
        // 대상: 모바일 GNB
        $('#mobx').slideToggle(400);
    });
});




