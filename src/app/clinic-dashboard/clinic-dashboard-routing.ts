import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyScheduleComponent } from './daily-schedule/daily-schedule.component';
import { ClinicDashboardComponent } from './clinic-dashboard.component';
import { ClinicDashboardGuard } from './clinic-dashboard.guard';
import { MonthlyScheduleComponent } from './monthly-schedule/monthly-schedule.component';
import { VisualizationComponent } from './clinical-summary-visualization/visualization-component';
import { ClinicLabOrdersComponent } from './clinic-lab-orders/clinic-lab-orders.component';
import { DailyScheduleVisitsComponent } from './daily-schedule/daily-schedule-visits.component';
import { DailyScheduleAppointmentsComponent }
  from './daily-schedule/daily-schedule-appointments.component';
import { DailyScheduleNotReturnedComponent
} from './daily-schedule/daily-schedule-not-returned.component';
import { DefaulterListComponent } from './defaulter-list/defaulter-list.component';
import { VisualizationPatientListComponent } from
'./clinical-summary-visualization/visualization-patient-list/visualization.patient-list.component';
import {
  ClinicFlowSummaryComponent
} from '../hiv-care-lib/clinic-flow/clinic-flow-summary.component';
import {
  ClinicFlowVisitsComponent
} from '../hiv-care-lib/clinic-flow/clinic-flow-visits.component';
import { PatientStatusChangeVisualizationContainerComponent } from
  './patient-status-change-visualization/patient-status-change-visualization.container.component';
import { PatientStatusChangeListComponent } from
  './patient-status-change-visualization/patient-status-change-list.component';
import {
  ClinicFlowLocationStatsComponent
} from '../hiv-care-lib/clinic-flow/clinic-flow-location-stats.component';
import {
  ClinicFlowProviderStatsComponent
} from '../hiv-care-lib/clinic-flow/clinic-flow-provider-stats.component';
import {
  DailyScheduleClinicFlowComponent
} from './hiv/clinic-flow/daily-schedule-clinic-flow.component';
import { PatientsProgramEnrollmentComponent } from
'../patients-program-enrollment/patients-program-enrollment.component';
import { ProgramEnrollmentPatientListComponent } from
'./../patients-program-enrollment/program-enrollent-patient-list.component';
const clinicDashboardRoutes: Routes = [
  {
    path: '', component: ClinicDashboardComponent,
    canActivate: [
      ClinicDashboardGuard
    ],
  },
  {
    path: ':location_uuid', component: ClinicDashboardComponent,
    children: [
      {
        path: 'daily-schedule', component: DailyScheduleComponent,
        children: [
          { path: 'daily-visits', component: DailyScheduleVisitsComponent },
          { path: 'daily-appointments', component: DailyScheduleAppointmentsComponent },
          { path: 'daily-not-returned', component: DailyScheduleNotReturnedComponent },
          {
            path: 'clinic-flow', component: DailyScheduleClinicFlowComponent,
            children: [
              {path: 'visits', component: ClinicFlowVisitsComponent},
              {path: 'summary', component: ClinicFlowSummaryComponent},
              {path: 'provider-stats', component: ClinicFlowProviderStatsComponent},
              {path: 'location', component: ClinicFlowLocationStatsComponent},
              {path: '', redirectTo: 'summary', pathMatch: 'prefix'}

            ]
          },
          {path: '', redirectTo: 'daily-appointments', pathMatch: 'prefix'},
        ]

      },
      {path: 'monthly-schedule', component: MonthlyScheduleComponent},
      {
        path: 'patient-status-change-visualization',
        children: [
          {
            path: ':view',
            component: PatientStatusChangeVisualizationContainerComponent
          },
          {
            path: ':view/patient-list',
            component: PatientStatusChangeListComponent
          },
          {path: '', redirectTo: 'cumulative', pathMatch: 'prefix'}
        ]
      },
      {
        path: 'program-enrollment',
        children: [
          {
            path: '',
            component: PatientsProgramEnrollmentComponent
          },
          {
            path: 'patient-list',
            component: ProgramEnrollmentPatientListComponent
          }
        ]
      },
      {path: 'clinic-lab-orders', component: ClinicLabOrdersComponent},
      {path: 'defaulter-list', component: DefaulterListComponent},
      {
        path: 'hiv', loadChildren: () =>
        System.import('./hiv/hiv-program.module')
          .then((mod) => mod.HivProgramModule)
      },
      {path: '', redirectTo: 'daily-schedule', pathMatch: 'prefix'},
      {
        path: 'referral', loadChildren: () =>
        System.import('./referral/patient-referral-program.module')
          .then((mod) => mod.PatientReferralProgramModule)
      }

    ],
    canActivate: [
      ClinicDashboardGuard
    ],
    canDeactivate: [
      ClinicDashboardGuard
    ]
  }
];
export const clinicDashboardRouting: ModuleWithProviders =
  RouterModule.forChild(clinicDashboardRoutes);
