"""
URL configuration for employee_election_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from election_process.election_list_page.elections_list import get_elections_list
from election_process.election_list_page.elections_card import get_elections_card
from election_process.election_details_page.overview import get_election_overview_details, get_election_timeline_details
from election_process.election_details_page.nominations import get_nomination_candidates_list, get_nominations_details
from election_process.election_details_page.results import get_results_chart_data, get_results_table, get_winner_details
from election_process.your_nominations.your_nominations import get_your_nominations_cards, get_your_notifications
from election_process.election_forms.election_forms import create_election, update_election
from election_process.election_forms.create_nomination import create_emp_nomination
from election_process.election_dashboard.election_dashboard import get_dashboard_election_list

urlpatterns = [
    path('admin/', admin.site.urls),
    path('election/cards', get_elections_card),
    path('elections/list', get_elections_list),

    path('election/overview/<int:election_id>', get_election_overview_details),
    path('election-timeline/<int:election_id>', get_election_timeline_details),
    path('election/nomination-details/<int:election_id>', get_nominations_details),
    path('election/nomination/list/<int:election_id>', get_nomination_candidates_list),

    path('election/winner/<int:election_id>', get_winner_details),
    path('election/charts/<int:election_id>',get_results_chart_data),
    path('election/results/<int:election_id>', get_results_table),

    path('your-nominations/list/<int:emp_id>', get_your_notifications),
    path('your-nominations/cards/<int:emp_id>', get_your_nominations_cards),

    path('election', create_election),
    path('election/<int:election_id>', update_election),

    path('election/<int:election_id>/nomination',create_emp_nomination),

    path('dashboard/election/list', get_dashboard_election_list)
]
