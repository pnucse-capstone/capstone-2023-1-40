from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import requests

# Create your views here.

fastapi_url = "https://c578-34-143-163-154.ngrok.io"
post_url = fastapi_url + "/post_data"
get_url = fastapi_url + "/get_data"

@method_decorator(csrf_exempt, name = "dispatch")
class ChatView(View):
    def get(self, request):
        return render(request, 'chat_ui.html')
    
    def post(self, request):
        user_input = json.loads(request.body).get('user_input')
        data = {"message" : user_input}
        response = requests.post(post_url, json=data)

        if response.status_code == 200:
            ans = requests.get(get_url).json()
            #print(ans)
            return JsonResponse(ans)
        else:
            return JsonResponse({'generated_ans' : '서버와 연결에 실패했습니다.'})
