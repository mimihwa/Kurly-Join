import React, { Component } from 'react';
import PostCode from './PostCode';
import './KurlyComponent.scss';

class KurlyComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            아이디:'',
            아이디ok:false,
            아이디중복확인:false,
            비밀번호: '',
            비밀번호1ok:false,
            비밀번호2ok:false,
            비밀번호3ok:false,
            비밀번호확인: '',
            이름: '',
            이메일: '',
            이메일ok:false,
            휴대폰: '',
            휴대폰ok:false,

            휴대폰인증:'',
            인증키:'123456',
            isPhoneOkOpen:false,
            isPhoneOkClass:true,
            isTimerOpen:true,
            disabled1:false,
            disabled2:false,
            minutes:2,
            seconds:59,
            couterStart:false,
            setId:0,

            주소: '',
            주소1:'',
            주소2:'',
            성별:'선택안함',
            생년: '',
            생월: '',
            생일: '',
            생년월일: '',
            추가입력사항: '',

            isAddInputBoxShow: false,
            addInputPlaceHolder: '',
            추가입력상자:'',
            
            약관동의: [],

            isAddressOn: false,
            isRegExpId:'',
            showId:false,
            isClassId:'',

            showPw:false,
            isClassPw1:'',
            isClassPw2:'',
            isClassPw3:'',

            showPwRe:false,
            isClassPwRe:'',

            showEmail:false,
            isClassEmail:'',

            isModalOpen:false, // 모달창 show & hide
            modalText:'', //아이디, 이메일, 인증번호 받기 가이드 텍스트

            isPhoneClass: false,

            showBirthDay:false,
            isClassBirthDay: '',
            birthDayGideText:'', 
        }
    }
    onMouseDown=(e)=>{
        this.setState({showId:true})
    }
    onChangeId=(value)=>{
        this.setState({아이디:value});
        this.inputIdText=value;
        //글자 길이 6자 이상 16자 이하
        //영문과 숫자조합
        /* this.idDoubleCheck(value); */

        const regexp=/(?=.*[A-Za-z])(?=.*\d)^[A-Za-z0-9]{6,16}$/g;
        if(value===''){
            this.setState({isClassId:'', 아이디ok:false});
        }else{
            if(regexp.test(value)){
                this.setState({isClassId:true, 아이디ok:true})
            }else{
                this.setState({isClassId:false, 아이디ok:false})
            }
        }
    }

    //아이디 중복확인 바복 처리문
    //1. 아이디 입력값 === 저장된 아이디 비교
    //2. 로컬스토리지 데이터에서 전체추출
    //3. 아이디만 추출
    //4. 반복처리후 비교하여 같은 아이디가 있다면 true로 변환
    //5. 결과 값이 true이면 '이미 등록된 아이디입니다' 출력
    //6. 결과 값이 false이면 '사용 가능한 아이디입니다' 출력

    /* idDoubleCheck(value){
        const inputId=value;
        let imsiArr=[]; //데이터베이스 임시객체
        let ok= false;

        for(let i=0; i<localStorage.length; i++){
            imsiArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))).아이디)
            if(imsiArr[i]===inputId){
                ok=true
            }
        }
        for(let i=0; i<imsiArr.length; i++){
            if(inputId===imsiArr[i].아이디){
                ok=true;
                return;
            }
        }

        if(ok!==true){
            this.setState({
                아이디ok: true,
                modalText:'사용 가능한 아이디입니다.'
            })
        }else{
            this.setState({
                아이디ok: false,
                modalText:'이미 등록된 아이디입니다.'
            })
        }
    } */

    onChangeEmail=(value)=>{
        this.emailValue=value;
        this.setState({이메일:value});

        this.inputEmailText=value;
        
        /* this.emailDoubleCheck(value); */

        //정규표현식
        //wmfskf@naver.com
        //wmfskf@hanmail.net
        //wmfskf@yahoo.co.kr

        const regExp4=/^[A-Za-z0-9]+(.[A-Za-z0-9-_])*@[A-Za-z]+(.[A-Za-z])+(.[A-Za-z]{2,3})$/;
        if(value===''){
            this.setState({
                isClassEmail:'',
                이메일ok:false
            })
        }else{
            if(regExp4.test(value)){
                this.setState({
                    isClassEmail:true,
                    이메일ok:true
                })
            }else{
                this.setState({
                    isClassEmail:false,
                    이메일ok:false
                })
            }
        }
    }

    /* emailDoubleCheck(value){
        const inputEmail=value;
        let imsiArrE=[]; //데이터베이스 임시객체
        let ok= false;

        for(let i=0; i<localStorage.length; i++){
            imsiArrE.push(JSON.parse(localStorage.getItem(localStorage.key(i))).이메일)
            if(imsiArrE[i]===inputEmail){
                ok=true
            }
        }
        for(let i=0; i<imsiArrE.length; i++){
            if(inputEmail===imsiArrE[i].이메일){
                ok=true;
                return;
            }
        }

        if(ok!==true){
            this.setState({
                이메일ok: true,
                modalText:'사용 가능한 이메일입니다.'
            })
        }else{
            this.setState({
                이메일ok: false,
                modalText:'이미 등록된 이메일입니다.'
            })
        }
    } */

    //중복확인
    onClickIdModalEvent=(e) =>{
        e.preventDefault();
        this.setState({
            isModalOpen: true,
            아이디중복확인: true
        });
        if(this.state.아이디===''){
            this.setState({
                modalText:'아이디를 입력해주세요',
                아이디ok:false
            })
        }else{
            if(this.state.isClassId===false){
                this.setState({
                    modalText:'아이디는 6자 이상 16자 이하의 영문과 숫자로 조합 가능합니다.',
                    아이디ok:false
                })
            }else{
                /* this.setState({
                    modalText:'사용가능한 아이디입니다.',
                    아이디ok:true
                }) */
                /* this.idDoubleCheck(); */ //중복확인 함수 호출

                let imsiDb=[];

                for(let i=0; i<localStorage.length; i++){
                    imsiDb.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
                }
                console.log(imsiDb);

                let result=imsiDb.map((item)=> item.아이디===this.inputIdText);
                if(result.includes(true)){
                    this.setState({
                        modalText: '중복된 아이디입니다.',
                        아이디ok: false
                    })
                }else{
                    this.setState({
                        modalText: '사용가능한 아이디입니다.',
                        아이디ok: true
                    })
                }
            }
        }
    }

    //중복확인 이메일 클릭
    onClickEmailModalEvent=(e) =>{
        e.preventDefault();
        const regExp=/^[A-Za-z0-9]+(.[A-Za-z0-9-_])*@[A-Za-z]+(.[A-Za-z])+(.[A-Za-z]{2,3})$/;
        this.setState({isModalOpen: true});
        
        if(this.emailValue===''){
            this.setState({
                modalText:'이메일을 입력해 주세요.',
                이메일ok:false
            })
        }else{
            if(regExp.test(this.emailValue)===false){
                this.setState({
                    modalText:'잘못된 이메일 형식입니다.',
                    이메일ok:false
                })
            }else{
                /* this.setState({
                    modalText:'사용가능한 이메일입니다.',
                    이메일ok:true
                }) */ 
                /* this.emailDoubleCheck(); */ //중복확인 함수 호출

                let imsiDb=[];

                for(let i=0; i<localStorage.length; i++){
                    imsiDb.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
                }
                console.log(imsiDb);

                let result=imsiDb.map((item)=> item.이메일===this.inputEmailText);
                if(result.includes(true)){
                    this.setState({
                        modalText: '중복된 이메일입니다.',
                        아이디ok: false
                    })
                }else{
                    this.setState({
                        modalText: '사용가능한 이메일입니다.',
                        아이디ok: true
                    })
                }
            }
        }
    }

    onClickModalClose=(e) =>{
        e.preventDefault();
        this.setState({isModalOpen: false});
    }
    
    onFocusPw=(e)=>{
        this.setState({showPw:true})
    }
    onChangePw=(value)=>{
        this.setState({비밀번호:value});

        const regExp1=/.{10,}/;
        const regExp2=/((?=.*[A-Za-z])+((?=.*[0-9])+|(!@#$%&-_*)+)+)[^\s][A-Za-z0-9!@#$%&-_*]{10,}/;
        const regExp3=/(\d)\1\1/;

        if(value===''){
            this.setState({
                isClassPw1:'',
                비밀번호ok: false
            })
        }else{
            if(regExp1.test(value)){
                this.setState({
                    isClassPw1:true,
                    비밀번호1ok:true
                })
            }else{
                this.setState({
                    isClassPw1:false,
                    비밀번호1ok:false
                })
            }
        }

        if(value===''){
            this.setState({
                isClassPw2:'',
                비밀번호ok: false
            })
        }else{
            if(regExp2.test(value)){
                this.setState({
                    isClassPw2:true,
                    비밀번호2ok:true
                })
            }else{
                this.setState({
                    isClassPw2:false,
                    비밀번호2ok:false
                })
            }
        }

        if(value===''){
            this.setState({
                isClassPw3:'',
                비밀번호ok: false
            })
        }else{
            if(regExp3.test(value)===false){
                this.setState({
                    isClassPw3:true,
                    비밀번호3ok:true
                })
            }else{
                this.setState({
                    isClassPw3:false,
                    비밀번호3ok:false
                })
            }
        }
    }

    onFocusPwRe=()=>{
        this.setState({showPwRe:true})
    }
    onChangePwRe=(value)=>{
        this.setState({비밀번호확인:value});
        if(value===''){
            this.setState({isClassPwRe:''})
        }else{
            if(this.state.비밀번호===value){
                this.setState({isClassPwRe:true})
            }else{
                this.setState({isClassPwRe:false})
            }
        }
    }

    onChangeName=(value)=>{
        this.setState({이름:value});
    }

    onFocusEmail=()=>{
        this.setState({showEmail:true})
        
    }
    

    onChangePhone=(value)=>{
        let result = value.replace(/[^0-9]/g, '');
    
        this.setState({휴대폰: result });
    
        //휴대폰 번호가 10이상이면 우측에 인증번호받기 버튼이 보인다.
        if( this.state.휴대폰.length >= 10 ){
           this.setState({isPhoneClass: true });
        }
        else {
          this.setState({isPhoneClass: false });
        }
    }

    onClickPhoneEvent=(e) =>{
        e.preventDefault();
        //010 4494 9814
        //010 223 9814
        if(!/^010[0-9]{3,4}[0-9]{4}$/g.test(this.state.휴대폰)){
            this.setState({
                휴대폰ok:false,
                isModalOpen: true,
                modalText:'잘못된 휴대폰 번호 입니다. 확인 후 다시 시도해 주세요.'
            })
            return;
        }else{
            this.setState({
                휴대폰ok:true,
                isModalOpen:true,
                modalText:'인증번호가 전송되었습니다.',
                isPhoneOkOpen:true,
                disabled:true
            })
            this.counterTimer();
        }
    }

    onChangePhoneOk=(value)=>{
        this.setState({휴대폰인증:value});
    }

    onClickPhoneOkEvent=(e)=>{
        e.preventDefault();
        if(this.state.휴대폰인증===this.state.인증키){
            this.setState({
                isModalOpen:true,
                modalText:'인증번호가 완료되었습니다.',
                isTimerOpen:false,
                disabled2:true,
                isPhoneOkClass:false
            });
            clearInterval(this.state.setId);
        }else{
            this.setState({
                isModalOpen:true,
                modalText:'인증번호를 확인하세요.',
                isTimerOpen:true,
                disabled2:false
            })
        }

    }

    //타이머함수
    counterTimer(){
       let setId2=setInterval(()=>{
        this.setState({seconds:this.state.seconds-1});
        if(this.state.seconds<=0){
            this.setState({
                seconds:59,
                minutes:this.state.minutes-1 //1분감소
            });
            if(this.state.minutes<=0){
                clearInterval(setId2);
                this.setState({
                    seconds:0,
                    minutes:0
                })
            }
        }
       },1000);
       this.setState({setId:setId2}); 
    }

    onChangeAddr=(value)=>{
        this.setState({주소:value});
    }
    onChangeGender=(value)=>{
        this.setState({성별:value})
    }

    //생년월일 체크 함수
    //1.생년
    //1900-2999

   // const regExp=/(?:1[0-9][0-9][0-9]|2[0-9][0-9][0-9])/g
   // const regExp=/(?:1\d\d\d|2\d\d\d)/g

   //년,월 일 모두 입력제한 조건을 만족할때
   //미래의 생년월일 가입 불가
   //만 14세 미만 가입 불가
   //만 100세 초과 가입 불가
   //생년월일 저장

    birthDayCheckEventFn=(z) =>{
        const {생년, 생월, 생일} =this.state;
        const lastDate=new Date(생년, 생월, 0).getDate();//0=>말일을 찾아줌, 1=> 다음달 첫날을 찾아줌
        const nowYear=new Date().getFullYear();
        const nowMonth=new Date().getMonth()+1;
        const nowDate=new Date().getDate();
        const nowToday=new Date(nowYear,nowMonth, nowDate);
        const nowToday14=new Date(nowYear-14,nowMonth, nowDate )
        const nowToday100=new Date(nowYear-100,nowMonth, nowDate )
        const birthDay=new Date(생년, 생월, 생일);

        if(생년==='' && 생월==='' && 생일===''){
            return;
        }else{
           //생년 체크
           if(/^(?:1\d\d\d|2\d\d\d)$/g.test(생년)===false){
                this.setState({
                    showBirthDay:true,
                    isClassBirthDay: false,
                    birthDayGideText:'태어난 년도 4자리를 정확하게 입력해 주세요.'
                })
           }else{
                this.setState({
                    showBirthDay:false,
                    isClassBirthDay: '',
                    birthDayGideText:'',
                })
                if(/^(?:0?[1-9]|1[012])$/g.test(생월)===false){
                    this.setState({
                        showBirthDay:true,
                        isClassBirthDay:false,
                        birthDayGideText:'태어난 월을 정확하게 입력해주세요.'
                    })
                }else{
                    this.setState({
                        showBirthDay:false,
                        isClassBirthDay: '',
                        birthDayGideText:'',
                    })
                    if(/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(생일)===false || 생일 > lastDate){
                        this.setState({
                            showBirthDay:true,
                            isClassBirthDay:false,
                            birthDayGideText:'태어난 일을 정확하게 입력해주세요.'
                        })
                    }else{
                        this.setState({
                            showBirthDay:false,
                            isClassBirthDay: '',
                            birthDayGideText:'',
                        })
                        //미래
                        if(birthDay>nowToday){
                            this.setState({
                                showBirthDay:true,
                                isClassBirthDay:false,
                                birthDayGideText:'생년월일이 미래로 입력되었습니다.'
                            })
                            return;
                        }else{
                            this.setState({
                                showBirthDay:false,
                                isClassBirthDay:'',
                                birthDayGideText:''
                            })
                        }
                        //만 14세 미만 가입불가
                        if(birthDay>nowToday14){
                            this.setState({
                                showBirthDay:true,
                                isClassBirthDay:false,
                                birthDayGideText:'만 14세 미만은 가입이 불가합니다.'
                            })
                            return;
                        }else{
                            this.setState({
                                showBirthDay:false,
                                isClassBirthDay:'',
                                birthDayGideText:''
                            })
                        }
                        //100세 이상 가입불가
                        if(birthDay<nowToday100){
                            this.setState({
                                showBirthDay:true,
                                isClassBirthDay:false,
                                birthDayGideText:'생년월일을 다시 확인해주세요.'
                            })
                            return;
                        }else{
                            this.setState({
                                showBirthDay:false,
                                isClassBirthDay:'',
                                birthDayGideText:''
                            })
                        }
                    }
                }
            }
        }
    }
    onFocusEvent=(z)=>{
        this.birthDayCheckEventFn(z);
    }
    onBlurEvent=(z)=>{
        this.birthDayCheckEventFn(z);
    }
    onChangeYear=(value)=>{
        this.setState({생년:value});
    }
    onChangeMonth=(value)=>{
        this.setState({생월:value});
    }
    onChangeDate=(value)=>{
        this.setState({생일:value});
    }
    onChangeChoocheon=(value, id)=>{
        if(id==='event'){
            this.setState({
                추가입력사항:value,
                isAddInputBoxShow:true,
                addInputPlaceHolder:'참여 이벤트명을 입력해주세요.'
            })
        }else{
            this.setState({
                추가입력사항:value,
                isAddInputBoxShow:true,
                addInputPlaceHolder:'참여 추천인 아이디를 입력해주세요.'
            })
        }
    }

    onChangeAddInputBox=(value)=>{
        this.setState({
            추가입력상자:value,
        })
    }

    onChangeAddress1=(value)=>{
        this.setState({주소1:value});
        this.setState({isAddressInputShow: true});//재검색
        this.setState({isAddressOn: false});//검색완료되면 초기화
    }
    onChangeAddress2=(value)=>{
        this.setState({주소2:value});
    }
    onClickAddress= (e) => {
        e.preventDefault();
        this.setState({isAddressOn:true})
    }

    //추가 입력사항 라디오버튼 체인지 이벤트

    onChangeCheckedEvent=(checked, value)=>{
        let result='';
        if(checked){
            if(value==='SMS' && this.state.약관동의.includes('EMAIL')){
                this.setState({약관동의:[...this.state.약관동의, value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)']})
            }else if(value==='EMAIL' && this.state.약관동의.includes('SMS')){
                this.setState({약관동의:[...this.state.약관동의, value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)']})
            }else if(value=== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)'&& this.state.약관동의.includes('SMS') && !this.state.약관동의.includes('EMAIL')){
                this.setState({약관동의:[...this.state.약관동의, 'EMAIL', value]})
            }else if(value=== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)'&& !this.state.약관동의.includes('SMS') && this.state.약관동의.includes('EMAIL')){
                this.setState({약관동의:[...this.state.약관동의, 'SMS', value]})
            }else if(value=== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)'&& this.state.약관동의.includes('SMS') && this.state.약관동의.includes('EMAIL')){
                this.setState({약관동의:[...this.state.약관동의, value]})
            }else if(value=== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)'&& !this.state.약관동의.includes('SMS') && !this.state.약관동의.includes('EMAIL')){
                this.setState({약관동의:[...this.state.약관동의, 'SMS', 'EMAIL', value]})
            }else{
                this.setState({약관동의:[...this.state.약관동의, value]})
            }
        }else{
            if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)'){
                result=this.state.약관동의.filter((item) => item!==value);
                result=result.filter((item)=>item!=='SMS');
                result=result.filter((item)=>item!=='EMAIL');
            }else if(value==='SMS'){
                result=this.state.약관동의.filter((item) => item!==value);
                result=result.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)');
            }
            else if(value==='EMAIL'){
                result=this.state.약관동의.filter((item) => item!==value);
                result=result.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)');
            }else{
                result=this.state.약관동의.filter((item) => item!==value);
            }
            this.setState({약관동의: result});
        }
    }
    onChangeCheckedEventAll=(checked, value)=>{
        let imsi=[
            `이용약관동의 (필수)`,
            `개인정보 수집∙이용 동의 (필수)`,
            `개인정보 수집∙이용 동의 (선택)`,
            `무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)`,
            `SMS`,
            `EMAIL`,
            `본인은 만 14세 이상입니다. (필수)`
        ];
        if(checked){
            this.setState({약관동의: imsi})
        }else{
            this.setState({약관동의: []})
        }
    }

    onSubmitEvent=(e)=>{
        e.preventDefault();
    
        const {아이디, 비밀번호, 이름, 이메일, 휴대폰,  주소1, 주소2, 주소, 성별, 생년, 생월, 생일, 추가입력사항, 약관동의, 아이디ok, 비밀번호1ok, 비밀번호2ok, 비밀번호3ok, 이메일ok, 휴대폰ok, 아이디중복확인, 추가입력상자} = this.state;      
    
        if(아이디==='' || 비밀번호 === '' || 이름 === '' ||  이메일==='' || 휴대폰==='' || 주소1==='' || 주소2==='' ){
            if(아이디===''){
              this.setState({
                isModalOpen : true,
                modalText : '아이디를 입력해주세요.'
              })
            }else if(비밀번호===''){
              this.setState({
                isModalOpen : true,
                modalText : '비밀번호를 입력해주세요.'
              })
            }else if(이름===''){
              this.setState({
                isModalOpen : true,
                modalText : '이름을 입력해주세요.'
              })
            }else if(이메일===''){
              this.setState({
                isModalOpen : true,
                modalText : '이메일을 입력해주세요.'
              })
            }else if(휴대폰===''){
              this.setState({
                isModalOpen : true,
                modalText : '휴대폰을 입력해주세요.'
              })
            }
            /* else if(주소===''){
              this.setState({
                isModalOpen : true,
                modalText : '주소를 입력해주세요.'
              })
            }   */      
            return;
        }else{
            console.log( '아이디ok' , 아이디ok  );
            console.log( '비밀번호1ok' , 비밀번호1ok  );
            console.log( '비밀번호2ok' , 비밀번호2ok  );
            console.log( '비밀번호3ok' , 비밀번호3ok  );
            console.log( '이메일ok' , 이메일ok  );
            console.log( '휴대폰ok' , 휴대폰ok  );
            console.log( '아이디중복확인' , 아이디중복확인  );
    
            //입력값 규칙을 어기면 입력취소
            if( 아이디ok===false || 비밀번호1ok===false ||  비밀번호2ok===false ||  비밀번호3ok===false ||  이메일ok===false ||  휴대폰ok===false ||  아이디중복확인===false ){
                if(아이디ok===false){
                this.setState({
                    isModalOpen : true,
                    modalText : '아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다'
                })
                }else if(이메일ok===false){
                this.setState({
                    isModalOpen : true,
                    modalText : '잘못된 이메일 형식입니다.'
                    })
                }
                return;
            }else {
                //아니면 정상 데이터 전송
                let cnt=0;
                console.log( 약관동의 );
                //약관동의 필수 3개 체크 해야 전송
                for(let i=0; i<약관동의.length; i++){
                    if( 약관동의[i].indexOf('필수') >=0 ){ //찾았다면 못찾으면 -1
                       cnt++; 
                    }
                }
                console.log( cnt );
    
                if(cnt < 3){
                this.setState({
                    isModalOpen : true,
                    modalText : '약관동의 필수 선택사항 선택하세요.'
                })
                return;
                }else { 
                    //모든 조건 만족하고 그리고 전송 저장
                    //1. 임시객체 생성 
                    //2. JSON.stringify() 객체라 문자열 형식으로 변환
                    const 가입회원정보 = {
                        아이디: 아이디,
                        비밀번호: 비밀번호,
                        이름: 이름,
                        이메일: 이메일,
                        휴대폰: 휴대폰,
                        주소: ` ${주소1} ${주소2}`,
                        성별: 성별,
                        생년월일: `${생년} ${생월} ${생일}`,
                        추가입력사항: 추가입력사항,
                        추가입력상자: 추가입력상자,
                        약관동의: 약관동의,
                        가입일자: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    }

                    console.log(가입회원정보);

                    //저장
                    localStorage.setItem(가입회원정보.아이디, JSON.stringify(가입회원정보));
    
                    //초기화
                    this.setState({
                        아이디: '',
                        아이디ok: false,
                        아이디중복확인: false,
                        비밀번호: '',
                        비밀번호1ok: false,
                        비밀번호2ok: false,
                        비밀번호3ok: false,
                        비밀번호확인: '',
                        이름: '',
                        이름ok: false,
                        이메일: '',
                        이메일ok: false,
                        휴대폰: '',
                        휴대폰ok: false,
                        isPhoneOkOpen:false,
                        주소1: '',
                        주소2: '',
                        주소: '',
                        성별: '선택안함', //라디오버튼
                        생년:'',
                        생월:'',
                        생일:'',
                        생년월일: '',
                        추가입력사항: '',  //라디오버튼
                        약관동의: [],     //체크박스 다중선택 저장 객체 배열
                        isAddInputBoxShow: false,
                        addInputPlaceHolder: '',
                        추가입력상자:',',
                        isAddressOn: false,  //주소검색을 클릭하면 true로 변환 그럼 주소검색창이 열린다.
                        isAddressInputShow: false,//주소검색을 클릭하면 true로 변환 그럼 주소검색창이 열린다.
                        showId: false, //아이디의 가이드텍스트 show        
                        isClassId:'',  //클래스를 '' : true : false
                        showPw: false, //비밀번호의 가이드텍스트 show   
                        isClassPw1:'', //클래스를 '' : true : false
                        isClassPw2:'',
                        isClassPw3:'',
                        showPwRe: false, //비밀번호확인  
                        isClassPwRe:'',
                        isClassEmail:'', //이메일
                        showEmail:false,
                        isModalOpen : false, //모달창 show & hide
                        modalText : '',  //아이디/이메일/인증번호받기 가이드 텍스트
                        isPhoneClass: false, //휴대폰 버튼 클래스
                        showBirthDay: false, //show hide
                        isClassBirthDay:'', //'',true, false
                        birthDayGuideText:'', //가이드텍스트 여러가지 내용
                    });
                }
            }
        }
    }
    render() {
        return (
            <div id='kurly'>
                <div className="title">
                    <h1><img src="../../img/logo.svg" alt="" /></h1>
                </div>
                <div className="content">
                    <h2>회원가입</h2>
                    <h4>
                        <span>
                            <i>*</i> 
                            필수입력사항
                        </span>
                    </h4>
                    <form action="#" onSubmit={this.onSubmitEvent}>
                        <ul>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>
                                            아이디
                                            <i>*</i>
                                        </span>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" className="inputText" id="inputId" placeholder='아이디를 입력해주세요.' onChange={(e)=>this.onChangeId(e.target.value)} value={this.state.아이디} onFocus={(e)=>this.onMouseDown(e)}/>
                                        <button className='w120-btn' onClick={this.onClickIdModalEvent}>중복확인</button>
                                        {
                                            this.state.showId && (
                                                <>
                                                    <p className={(this.state.isClassId===''?'':(this.state.isClassId===true?'green':'red'))}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>
                                            비밀번호
                                            <i>*</i>
                                        </span>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" className="inputText" id="inputPw" placeholder='비밀번호를 입력해주세요.' onChange={(e)=>this.onChangePw(e.target.value)} value={this.state.비밀번호} onFocus={(e)=>this.onFocusPw(e)}/>

                                        {
                                            this.state.showPw && (
                                                <>
                                                    <p className={(this.state.isClassPw1===''?'':(this.state.isClassPw1===true? 'green':'red'))}>최소 10자 이상 입력</p>
                                                    <p className={(this.state.isClassPw2===''?'':(this.state.isClassPw2===true? 'green':'red'))}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                                                    <p className={(this.state.isClassPw3===''?'':(this.state.isClassPw3===true? 'green':'red'))}>동일한 숫자 3개 이상 연속 사용 불가</p>
                                                </>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>
                                            비밀번호 확인
                                            <i>*</i>
                                        </span>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" className="inputText" id="inputPw1" placeholder='비밀번호를 한 번 더 입력해주세요.' onChange={(e)=>this.onChangePwRe(e.target.value)} value={this.state.비밀번호확인} onFocus={(e)=>this.onFocusPwRe(e)} />
                                        {
                                            this.state.showPwRe && (
                                                <>
                                                    <p className={(this.state.isClassPwRe==='' ? '' : (this.state.isClassPwRe===true ? 'green':'red'))}>동일한 비밀번호를 입력</p>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>
                                            이름
                                            <i>*</i>
                                        </span>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" className="inputText" id="inputName" placeholder='이름을 입력해주세요.' onChange={(e)=>this.onChangeName(e.target.value)} value={this.state.이름}/>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>
                                            이메일
                                            <i>*</i>
                                        </span>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" className="inputText" id="inputEmail" placeholder='예: marketkurly@kurly.com' onChange={(e)=>this.onChangeEmail(e.target.value)} value={this.state.이메일} onFocus={(e)=>this.onFocusEmail(e)} />
                                        <button className='w120-btn' onClick={this.onClickEmailModalEvent}>중복확인</button>
                                        {
                                            this.state.showEmail && (
                                                <>
                                                    <p className={(this.state.isClassEmail===''?'':(this.state.isClassEmail===true? 'green': 'red'))} >이메일을 입력해주세요.</p>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>휴대폰 <i>*</i></span>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" className="inputText" id="inputPhone" placeholder='숫자만 입력해주세요' value={this.state.휴대폰} onChange={(e)=> this.onChangePhone(e.target.value)} />
                                        <button disabled={this.disabled1} onClick={this.onClickPhoneEvent} className={`w120-btn ${this.state.isPhoneClass ? '': 'phone'}`}>인증번호받기</button>

                                        {
                                            this.state.isPhoneOkOpen && (
                                                <>
                                                    <input type="text" maxLength='6' className='inputText' id='inputPhone1' placeholder='인증번호를 입력하세요.' value={this.state.휴대폰인증} disabled={this.disabled2} onChange={(e)=>this.onChangePhoneOk(e.target.value)} />
                                                    <button onClick={this.onClickPhoneOkEvent} className={`w120-btn phoneOk-btn ${this.state.isPhoneOkClass ? '' : 'phone'}`} disabled={this.disabled2} >인증번호확인</button>
                                                    {
                                                        this.state.isTimerOpen && (
                                                            <span className='counter-timer-box'>{this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}`: this.state.seconds}</span>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                       
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>
                                            주소
                                            <i>*</i>
                                        </span>
                                    </div>
                                    <div className="input-box">
                                        {
                                            this.state.isAddressInputShow && (
                                                <>
                                                    <input type="text" className='inputText' id='inputAddress1' placeholder='주소입력1' value={this.state.주소1} onChange={(e)=>this.onChangeAddress1(e.target.value)}/>
                                                    <input style={{margin: '5px 0'}} type="text" className='inputText' id='inputAddress2' placeholder='나머지 주소' value={this.state.주소2} onChange={(e)=> this.onChangeAddress2(e.target.value)} />
                                                </>
                                            ) 
                                        }
                                        <button onClick={this.onClickAddress} type='button' className='inputText addr' id='inputAddr'>
                                            <img src="../../img/ico_search.svg" alt="검색" />
                                            <span>
                                                {
                                                    this.state.isAddressInputShow === true ? `주소재검색` : `주소검색`
                                                }
                                            </span>
                                        </button>
                                        <div id="postcode">
                                            {
                                                this.state.isAddressOn && (<PostCode onChangeAddress1={this.onChangeAddress1} />)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>성별</span>
                                    </div>
                                    <div className="input-box radio-box">
                                        <label>
                                            <input type="radio" checked={this.state.성별.includes(`남자`)} onChange={(e)=>this.onChangeGender(e.target.value)} value={`남자`}/>
                                            <span>남자</span>
                                        </label>
                                        <label>
                                            <input type="radio" checked={this.state.성별.includes(`여자`)} onChange={(e)=>this.onChangeGender(e.target.value)} value={`여자`}/>
                                            <span>여자</span>
                                        </label>
                                        <label>
                                            <input type="radio" checked={this.state.성별.includes(`선택안함`)} onChange={(e)=>this.onChangeGender(e.target.value)} value={`선택안함`}/>
                                            <span>선택안함</span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>생년월일</span>
                                    </div>
                                    <div className="input-box">
                                        <ul className="date-box">
                                            <li><input type="text" id="year" placeholder='YYYY' value={this.state.생년} onChange={(e)=> this.onChangeYear(e.target.value)} onFocus={(e)=>this.onFocusEvent(e)} onBlur={(e) =>this.onBlurEvent(e)} /></li>
                                            <li><span>/</span></li>
                                            <li><input type="text" id="month" placeholder='MM' value={this.state.생월} onChange={(e)=> this.onChangeMonth(e.target.value)} onFocus={(e)=>this.onFocusEvent(e)} onBlur={(e) =>this.onBlurEvent(e)} /></li>
                                            <li><span>/</span></li>
                                            <li><input type="text" id="date" placeholder='DD' value={this.state.생일} onChange={(e)=> this.onChangeDate(e.target.value)} onFocus={(e)=>this.onFocusEvent(e)} onBlur={(e) =>this.onBlurEvent(e)} /></li>
                                        </ul>
                                        {
                                            this.state.showBirthDay && (
                                                <p className={(
                                                    this.state.isClassBirthDay===""?"":(this.state.isClassBirthDay===true?'green':'red')
                                                )}>
                                                    {this.state.birthDayGideText}
                                                </p>
                                            )
                                         }
                                        {/*  <p>태어난 연도를 정확하게 입력해주세요</p> */}

                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>추가입력 사항</span>
                                    </div>
                                    <div className="input-box radio-box1">
                                        <div className='radio-box2'>
                                            <label>
                                                <input type="radio" checked={this.state.추가입력사항.includes(`추천인 아이디`)} onChange={(e)=>this.onChangeChoocheon(e.target.value, e.target.id)} value={`추천인 아이디`}/>
                                                <span>추천인 아이디</span>
                                            </label>
                                            <label>
                                                <input type="radio" checked={this.state.추가입력사항.includes(`참여 이벤트명`)} onChange={(e)=>this.onChangeChoocheon(e.target.value, e.target.id)} value={`참여 이벤트명`}/>
                                                <span>참여 이벤트명</span>
                                            </label>
                                        </div>
                                        {
                                            this.state.isAddInputBoxShow && (
                                                <div className='add-input-box'>
                                                    <input type="text" id='addInputBox' placeholder={this.state.addInputPlaceHolder} value={this.state.추가입력상자} onChange={(e)=>this.onChangeAddInputBox(e.target.value)}/>
                                                    <p>
                                                        추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다. <br />
                                                        가입 이후는 수정이 불가능 합니다. <br />
                                                        대소문자 및 띄어쓰기에 유의해주세요. <br />
                                                    </p>
                                                </div>
                                            )
                                        }
                                        
                                        
                                    </div>
                                </div>
                            </li>
                            <li>
                                <hr />
                            </li>
                            <li className='service'>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>이용약관동의
                                            <i>*</i>
                                        </span>
                                    </div>
                                    <div className="input-box check-box">
                                        <dl>
                                            <dt>
                                                <label>
                                                    <input type="checkbox" checked={this.state.약관동의.length >=7 ? true : false} onChange={(e)=>this.onChangeCheckedEventAll(e.target
                                                        .checked, e.target.value)} value={`전체 동의합니다.`} />
                                                    <span>전체 동의합니다.</span>
                                                </label>
                                                <p className='agree'>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                            </dt>
                                            <dd>
                                                <label>
                                                    <input type="checkbox" checked={this.state.약관동의.includes(`이용약관동의 (필수)`)} onChange={(e)=>this.onChangeCheckedEvent(e.target
                                                        .checked, e.target.value)} value={`이용약관동의 (필수)`}/>
                                                    <span>이용약관동의 <i>(필수)</i></span>
                                                </label>
                                                <span>
                                                    <a href="#!">약관보기 <i>&gt;</i></a>
                                                </span>
                                            </dd>
                                            <dd>
                                                <label>
                                                    <input type="checkbox" checked={this.state.약관동의.includes(`개인정보 수집∙이용 동의 (필수)`)} onChange={(e)=>this.onChangeCheckedEvent(e.target
                                                        .checked, e.target.value)} value={`개인정보 수집∙이용 동의 (필수)`}/>
                                                    <span>개인정보 수집∙이용 동의 <i>(필수)</i></span>
                                                </label>
                                                <span>
                                                    <a href="#!">약관보기 <i>&gt;</i></a>
                                                </span>
                                            </dd>
                                            <dd>
                                                <label>
                                                    <input type="checkbox" checked={this.state.약관동의.includes(`개인정보 수집∙이용 동의 (선택)`)} onChange={(e)=>this.onChangeCheckedEvent(e.target
                                                        .checked, e.target.value)} value={`개인정보 수집∙이용 동의 (선택)`}/>
                                                    <span>개인정보 수집∙이용 동의 <i>(선택)</i></span>
                                                </label>
                                                <span>
                                                    <a href="#!">약관보기 <i>&gt;</i></a>
                                                </span>
                                            </dd>
                                            <dd>
                                                <label>
                                                    <input type="checkbox" checked={this.state.약관동의.includes(`무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)`)} onChange={(e)=>this.onChangeCheckedEvent(e.target
                                                        .checked, e.target.value)} value={`무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)`}/>
                                                    <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의 <i>(선택)</i></span>
                                                </label>
                                                <div className="sub-checkbox">
                                                    <div>
                                                        <label>
                                                            <input type="checkbox" checked={this.state.약관동의.includes(`SMS`)} onChange={(e)=>this.onChangeCheckedEvent(e.target
                                                        .checked, e.target.value)} value={`SMS`}/>
                                                            <span>SMS</span>
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" checked={this.state.약관동의.includes(`EMAIL`)} onChange={(e)=>this.onChangeCheckedEvent(e.target
                                                        .checked, e.target.value)} value={`EMAIL`}/>
                                                            <span>EMAIL</span>
                                                        </label>
                                                    </div>
                                                    <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <label>
                                                    <input type="checkbox" checked={this.state.약관동의.includes(`본인은 만 14세 이상입니다. (필수)`)} onChange={(e)=>this.onChangeCheckedEvent(e.target
                                                        .checked, e.target.value)} value={`본인은 만 14세 이상입니다. (필수)`}/>
                                                    <span>본인은 만 14세 이상입니다. <i>(필수)</i></span>
                                                </label>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="button-box">
                            <button type='submit'>가입하기</button>
                        </div>
                    </form>

                     {/* 모달창 중복확인(아이디, 이메일, 인증번호) */}
                     {
                        this.state.isModalOpen && (
                            <div className="modal">
                                <div className="container">
                                    <div className="content-box">
                                         <p>{this.state.modalText}</p>
                                    </div>
                                    <div className="button-box">
                                        <button className="ok-btn" title="확인" onClick={this.onClickModalClose}>확인</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
}

export default KurlyComponent;