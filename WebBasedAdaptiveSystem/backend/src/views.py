from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def handle_answer_selection(request):
    if request.method == 'POST':
        # Extract data from the POST request
        student_id = request.POST.get('student_id')
        start_time = request.POST.get('start_time')
        end_time = request.POST.get('end_time')
        question_id = request.POST.get('question_id')
        is_correct = request.POST.get('is_correct')

        # TODO: Write code to persist the data to the database using Django ORM
        # ...

        # Return a JSON response indicating success
        return JsonResponse({'success': True})
    else:
        # Return a JSON response with an error message if the request method is not POST
        return JsonResponse({'error': 'Invalid request method'})