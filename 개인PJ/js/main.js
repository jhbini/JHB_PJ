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
            console.log("현재슬번"), sno;
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

    //  박스 드래그설정
    move.draggable({
        axis: "x" 
    });

    // 3. 드래그 애니메이션 설정
    move.css({
        transition: "all .5s ease-out"
    }); ///////////// css ///////////////

    // -> 첫번째 한계값
    let fpt = $(window).width() / 6;

    // 마지막 한계값
    // -> 움직일 박스 전체가로크기
    let lpt = move.width() - (fpt * 5);

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

        }); /////////// mousemove /////////////

}) /////////// jQB ////////////////</script>