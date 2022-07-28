$(() => {

    // 호출확인
    console.log("로딩완료");

    // 이벤트 대상: .abtn
    // 이벤트 : click() 메서드 사용
    // 양쪽버튼 구분 : .ab1(왼쪽버튼) / .ab2(오른쪽버튼)
    // 변경대상: #slide li
    // 변경내용: 슬라이드의 left값을 이동하여 애니메이션함
    let slide = $(".slide li"); // li까지 선택함

    // 변경에 사용할 제이쿼리 메서드: 
    // animate({CSS속성},시간,이징,함수)

    // 변경대상: 블릿 - .indic li
    let indic = $(".indic li");

    // 광클 금지상태변수
    let prot = 0; // 1-불허용, 0-허용

    // d애니메이션 시간변수
    const aniT = 800;

    // 애니메이션 이징변수
    const aniE = "easeInOutQuad";

    // 페이드기능을 위한 초기화 설정
    // 슬라이드 li가 하나만 빼고 모두 불필요
    // display:none처리함 -> hide() 메서드
    slide.hide().first().show();
    // 슬라이드 li.다숨겨().첫번째().보여()

    // 현재 슬라이드 순번 변수
    let sno = 0;


    // 버튼 클릭 설정 ////////////
    $(".abtn").click(function () {

        // console.log("진입:", prot);

        // 광클금지 //////
        if (prot) return;
        prot = 1; // 잠금
        setTimeout(() => prot = 0, aniT);
        // 0.6초후 prot=0 잠금해제

        // console.log("통과:", prot);

        // 자동넘김 지우기함수 호출
        clearAuto();

        // 1. 오른쪽여부
        // is(클래스/아이디명) -> 선택요소해당여부 리턴
        let isR = $(this).is(".ab2");
        // 호출확인(방향확인)
        // console.log("오른쪽 버튼인가?",isR);

        // 2. 버튼별 분기하여 기능구현
        if (isR) { // 오른쪽버튼

            // fadeIn으로 다음 순번 보이기
            // eq(순번)-> 해당 순번 선택

            // 현재슬라이드 숨기기
            slide.eq(sno).fadeOut(aniT,aniE);
            // 슬라이드 순번 1증가
            sno++;
            // 슬라이드 한계값체크 처음으로
            if (sno === slide.length) sno = 0;
            // slide.length는 li개수
            console.log("현재슬번"), sno;
            // 다음순번 슬라이드 보이기
            slide.eq(sno).fadeIn(aniT,aniE);

        } ////////////// if //////////////
        else { // 왼쪽버튼

            // fadeIn으로 이전 순번 보이기
            // eq(순번)-> 해당 순번 선택

            // 현재슬라이드 숨기기
            slide.eq(sno).fadeOut(aniT,aniE);
            // 슬라이드 순번 1증가
            sno--;
            // 슬라이드 한계값체크 처음으로
            if (sno === -1) sno = slide.length-1;
            // slide.length는 li개수
            console.log("현재슬번"), sno;
            // 다음순번 슬라이드 보이기
            slide.eq(sno).fadeIn(aniT,aniE);
        } //////////////// else /////////

        // 3. 등장슬라이드와 같은 순번의 블릿 변경하기
        // 현재슬라이드번호(sno)와 같은순번의 블릿 클래스on
        indic.eq(sno).addClass("on")
        // 다른 형제들 블릿 클래스 제거
        .siblings().removeClass("on");

    }); ///////////// click //////////////


    // 배너 자동호출 넘기기 셋팅
    // 인터발함수 : setInterval(함수,시간)
    // 인터발 지우기 함수: clearInterval(변수)
    // 타임아웃함수 : seTimeout(함수,시간)
    // 타임아웃 지우기 함수 : clearTimeout(변수)
    // 타이밍함수는 변수에 할당해야 지울 수 있다

    // 인터발용 변수
    let autoI;

    // 타임아웃용변수
    let autoT;

    // 인터발 최초호출
    autoSlide();

    // 인터발 호출함수////////
    function autoSlide() {

        autoI = setInterval(() => {

            // fadeIn으로 다음 순번 보이기
            // eq(순번)-> 해당 순번 선택

            // 현재슬라이드 숨기기
            slide.eq(sno).fadeOut(aniT,aniE);
            // 슬라이드 순번 1증가
            sno++;
            // 슬라이드 한계값체크 처음으로
            if (sno === slide.length) sno = 0;
            // slide.length는 li개수
            console.log("현재슬번"), sno;
            // 다음순번 슬라이드 보이기
            slide.eq(sno).fadeIn(aniT,aniE);

            // 3. 등장슬라이드와 같은 순번의 블릿 변경하기
            // 현재슬라이드번호(sno)와 같은순번의 블릿 클래스on
            indic.eq(sno).addClass("on")
            // 다른 형제들 블릿 클래스 제거
            .siblings().removeClass("on");

        }, 4000); ///// 인터발함수 /////


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