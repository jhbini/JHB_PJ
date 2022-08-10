

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



