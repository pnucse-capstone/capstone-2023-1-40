### 1. 프로젝트 소개  
  
  #### LLM이란? 
  
     • LLM(Large Language Model)은 대규모 텍스트 데이터를 학습한 인공지능 모델  
   
     • 흔히, 우리에게 익숙한 생성형 AI인 GPT (Generative Pre-trained Transform) 역시 LLM 모델의 일종  
  
  #### 개발 목적 
  
     • 인구의 고령화 추세와 함께, 의료분야는 인력 부족과 치료비용 상승의 문제에 직면함  
   
     • 기존의 의료용 chat-bot은 룰 기반의 방식을 사용하여, 이미 정의된 규칙 외에 정확한 답변을 못하고 있음  
   
     • 따라서, LLM을 활용하여 의료용 데이터를 학습시킨 챗봇을 통해, 보다 정확하고 개인화된 의료 서비스를 제공함을 목표로 함
  
### 2. 팀 소개
김대영, eodud3526@gmail.com, 데이터 수집 및 LLM fine tuning  
강주호, kjh302903@gmail.com, 프론트엔드 개발  
정영진, yungzin98@naver.com, 백엔드 개발    

### 3. 구성도
<img width="535" alt="시스템 구성도" src="https://github.com/pnucse-capstone/capstone-2023-1-40/assets/62270210/5813adce-fd8e-4cde-a616-c5f810e98158">

### 4. 소개 및 시연 영상

### 5. 사용법
Python >= 3.10 및 fastapi, uvicorn, pyngrok 패키지와 Django가 설치되어 있어야 합니다. 
[How to install Django](https://docs.djangoproject.com/en/4.2/topics/install/#how-to-install-django)  

[Installing Packages](https://packaging.python.org/en/latest/tutorials/installing-packages)  

django 폴더는 서버 실행 환경에, run.ipynb 및 requirements.txt는 VRAM 16GB 이상인 GPU가 있는 환경에 다운받습니다.  
(Colab GPU 기준 V100 이상 필요)  

이후 run.ipynb 파일 내 모든 셀을 실행합니다.  
마지막 셀 결과물로 생성된 "https:// ~ .ngrok.io" url을 django 프로젝트 내 web/chat/views.py의 fastapi_url에 복사해줍니다.  
이후 web 폴더로 경로 변경 후 python manage.py runserver 커맨드를 실행합니다.  

http://127.0.0.1:8000 에서 실행된 챗봇을 확인합니다.
