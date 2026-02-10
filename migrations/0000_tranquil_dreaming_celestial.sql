CREATE TABLE "aml_checks" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"check_type" text NOT NULL,
	"status" text DEFAULT 'pending',
	"risk_level" text DEFAULT 'low',
	"risk_score" numeric(5, 2) DEFAULT '0.00',
	"sanctions_match" boolean DEFAULT false,
	"pep_match" boolean DEFAULT false,
	"adverse_media_match" boolean DEFAULT false,
	"match_details" jsonb,
	"check_source" text,
	"notes" text,
	"checked_at" timestamp DEFAULT now(),
	"reviewed_by" integer
);
--> statement-breakpoint
CREATE TABLE "api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"developer_id" integer NOT NULL,
	"name" text NOT NULL,
	"key_hash" text NOT NULL,
	"key_prefix" text NOT NULL,
	"permissions" jsonb DEFAULT '[]',
	"environment" text DEFAULT 'sandbox' NOT NULL,
	"industry" text,
	"use_case" text,
	"is_active" boolean DEFAULT true,
	"last_used_at" timestamp,
	"expires_at" timestamp NOT NULL,
	"rotation_due" timestamp NOT NULL,
	"last_rotated" timestamp DEFAULT now(),
	"rate_limit" integer DEFAULT 100,
	"monthly_quota" integer DEFAULT 10000,
	"current_month_usage" integer DEFAULT 0,
	"quota_reset_date" timestamp DEFAULT now(),
	"ip_whitelist" jsonb,
	"user_agent" text,
	"created_at" timestamp DEFAULT now(),
	"revoked_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "api_usage_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"api_key_id" integer NOT NULL,
	"developer_id" integer NOT NULL,
	"endpoint" text NOT NULL,
	"method" text NOT NULL,
	"status_code" integer NOT NULL,
	"response_time" integer,
	"user_agent" text,
	"ip_address" text,
	"request_size" integer,
	"response_size" integer,
	"error_message" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "arbitration_cases" (
	"id" serial PRIMARY KEY NOT NULL,
	"dispute_id" integer NOT NULL,
	"provider" text NOT NULL,
	"case_number" text,
	"status" text DEFAULT 'initiated',
	"cost" numeric(10, 2),
	"outcome" text,
	"arbitrator_notes" text,
	"created_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"client_org_id" integer,
	"event_type" text NOT NULL,
	"action" text NOT NULL,
	"resource" text,
	"resource_id" text,
	"old_values" jsonb,
	"new_values" jsonb,
	"ip_address" text,
	"user_agent" text,
	"session_id" text,
	"risk_level" text DEFAULT 'low',
	"checksum" text NOT NULL,
	"previous_log_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "client_organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"website" text,
	"industry" text,
	"risk_level" text DEFAULT 'low',
	"kyb_status" text DEFAULT 'pending',
	"kyb_completed_at" timestamp,
	"requires_manual_approval" boolean DEFAULT false,
	"enhanced_monitoring" boolean DEFAULT false,
	"production_approved" boolean DEFAULT false,
	"service_agreement_signed" boolean DEFAULT false,
	"security_checklist_completed" boolean DEFAULT false,
	"monthly_fraud_check_quota" integer DEFAULT 1000,
	"current_month_usage" integer DEFAULT 0,
	"quota_reset_date" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "developer_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"company_name" text,
	"website" text,
	"description" text,
	"status" text DEFAULT 'pending',
	"monthly_quota" integer DEFAULT 1000,
	"current_usage" integer DEFAULT 0,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"approved_at" timestamp,
	"approved_by" integer
);
--> statement-breakpoint
CREATE TABLE "disputes" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" integer NOT NULL,
	"raised_by" integer NOT NULL,
	"reason" text NOT NULL,
	"description" text NOT NULL,
	"status" text DEFAULT 'open',
	"resolution" text,
	"resolved_by" integer,
	"dispute_type" text NOT NULL,
	"ai_confidence_score" numeric(5, 2) DEFAULT '0.00',
	"fraud_indicators" jsonb,
	"priority_level" text DEFAULT 'normal',
	"auto_flagged" boolean DEFAULT false,
	"escalated_to_human" boolean DEFAULT false,
	"queue_position" integer,
	"assigned_agent" integer,
	"sla_deadline" timestamp,
	"evidence_submitted" jsonb,
	"created_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "domain_trust_scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"domain" text NOT NULL,
	"trust_score" numeric(5, 2) NOT NULL,
	"risk_level" text NOT NULL,
	"category" text,
	"is_phishing" boolean DEFAULT false,
	"is_malware" boolean DEFAULT false,
	"is_scam" boolean DEFAULT false,
	"is_suspicious" boolean DEFAULT false,
	"ssl_status" text,
	"domain_age" integer,
	"registrar_info" jsonb,
	"whois_data" jsonb,
	"google_safe_browsing" text,
	"virus_total_score" integer,
	"report_count" integer DEFAULT 0,
	"verified_legitimate" boolean DEFAULT false,
	"verified_by" integer,
	"last_analyzed" timestamp DEFAULT now(),
	"analysis_source" text,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "domain_trust_scores_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE TABLE "escalation_queue" (
	"id" serial PRIMARY KEY NOT NULL,
	"dispute_id" integer NOT NULL,
	"queue_type" text DEFAULT 'standard',
	"assigned_team" text,
	"position" integer NOT NULL,
	"sla_hours" integer DEFAULT 24,
	"escalated_at" timestamp DEFAULT now(),
	"assigned_at" timestamp,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "fraud_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"reporter_id" integer,
	"report_type" text NOT NULL,
	"target_domain" text,
	"target_phone_number" text,
	"target_email" text,
	"target_user_id" integer,
	"target_other" text,
	"fraud_type" text NOT NULL,
	"severity" text DEFAULT 'medium',
	"description" text NOT NULL,
	"evidence" jsonb,
	"financial_loss" numeric(12, 2),
	"reporter_location" text,
	"incident_date" timestamp,
	"report_source" text DEFAULT 'web',
	"status" text DEFAULT 'pending',
	"priority" text DEFAULT 'normal',
	"assigned_to" integer,
	"resolution" text,
	"actions_taken" jsonb,
	"follow_up_required" boolean DEFAULT false,
	"ip_address" text,
	"user_agent" text,
	"session_id" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "insurance_claims" (
	"id" serial PRIMARY KEY NOT NULL,
	"coverage_id" integer NOT NULL,
	"transaction_id" integer,
	"claim_amount" numeric(12, 2) NOT NULL,
	"claim_type" text NOT NULL,
	"status" text DEFAULT 'submitted',
	"fraud_score_reports" jsonb,
	"audit_logs" jsonb,
	"compliance_report" text,
	"claim_notes" text,
	"investigation_notes" text,
	"approved_amount" numeric(12, 2),
	"denial_reason" text,
	"submitted_at" timestamp DEFAULT now(),
	"processed_at" timestamp,
	"paid_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "insurance_coverage" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_org_id" integer NOT NULL,
	"transaction_id" integer,
	"policy_number" text NOT NULL,
	"coverage_type" text NOT NULL,
	"coverage_amount" numeric(12, 2) NOT NULL,
	"is_active" boolean DEFAULT true,
	"fraud_check_required" boolean DEFAULT true,
	"api_compliance_required" boolean DEFAULT true,
	"fraud_check_completed" boolean DEFAULT false,
	"api_compliance_verified" boolean DEFAULT false,
	"liability_cap" numeric(12, 2),
	"deductible" numeric(10, 2) DEFAULT '0.00',
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "ip_blacklist" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip_address" text NOT NULL,
	"reason" text NOT NULL,
	"severity" text DEFAULT 'medium',
	"source_type" text DEFAULT 'automatic',
	"incident_id" integer,
	"is_active" boolean DEFAULT true,
	"automatic_expiry" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"revoked_at" timestamp,
	CONSTRAINT "ip_blacklist_ip_address_unique" UNIQUE("ip_address")
);
--> statement-breakpoint
CREATE TABLE "kyb_verifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" integer NOT NULL,
	"business_name" text NOT NULL,
	"registration_number" text NOT NULL,
	"business_type" text NOT NULL,
	"business_address" text NOT NULL,
	"website" text,
	"industry" text,
	"status" text DEFAULT 'pending',
	"verification_score" numeric(5, 2) DEFAULT '0.00',
	"document_url" text,
	"notes" text,
	"submitted_at" timestamp DEFAULT now(),
	"reviewed_at" timestamp,
	"reviewed_by" integer
);
--> statement-breakpoint
CREATE TABLE "kyc_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"transaction_id" integer,
	"document_type" text NOT NULL,
	"file_name" text NOT NULL,
	"file_url" text NOT NULL,
	"file_size" integer,
	"mime_type" text,
	"status" text DEFAULT 'pending',
	"uploaded_at" timestamp DEFAULT now(),
	"verified_at" timestamp,
	"verified_by" integer
);
--> statement-breakpoint
CREATE TABLE "kyc_verifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"document_type" text NOT NULL,
	"document_number" text,
	"status" text DEFAULT 'pending',
	"notes" text,
	"submitted_at" timestamp DEFAULT now(),
	"reviewed_at" timestamp,
	"reviewed_by" integer
);
--> statement-breakpoint
CREATE TABLE "lms_business_enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_plan_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"enrollment_id" integer NOT NULL,
	"invited_by" integer,
	"invited_at" timestamp DEFAULT now(),
	"accepted_at" timestamp,
	"status" text DEFAULT 'invited',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_business_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_name" text NOT NULL,
	"plan_type" text NOT NULL,
	"max_employees" integer NOT NULL,
	"current_employees" integer DEFAULT 0,
	"admin_user_id" integer NOT NULL,
	"stripe_subscription_id" text,
	"status" text DEFAULT 'active',
	"started_at" timestamp DEFAULT now(),
	"renews_at" timestamp,
	"cancelled_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_certifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	"enrollment_id" integer NOT NULL,
	"certificate_number" text NOT NULL,
	"certificate_type" text NOT NULL,
	"title" text NOT NULL,
	"final_score" numeric(5, 2),
	"passing_score" numeric(5, 2) DEFAULT '70.00',
	"exam_attempts" integer DEFAULT 1,
	"issued_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"verification_url" text,
	"certificate_url" text,
	"is_revoked" boolean DEFAULT false,
	"revoked_at" timestamp,
	"revoked_reason" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "lms_certifications_certificate_number_unique" UNIQUE("certificate_number")
);
--> statement-breakpoint
CREATE TABLE "lms_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_id" integer NOT NULL,
	"title" text NOT NULL,
	"content_type" text NOT NULL,
	"content" jsonb,
	"order_index" integer DEFAULT 0,
	"duration" text,
	"is_required" boolean DEFAULT true,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"level" integer NOT NULL,
	"track_type" text NOT NULL,
	"duration" text,
	"price" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'GBP',
	"is_active" boolean DEFAULT true,
	"completion_certificate" boolean DEFAULT false,
	"prerequisites" jsonb,
	"learning_outcomes" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	"enrollment_type" text NOT NULL,
	"status" text DEFAULT 'active',
	"progress" numeric(5, 2) DEFAULT '0.00',
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"expires_at" timestamp,
	"certificate_earned" boolean DEFAULT false,
	"certificate_issued_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"module_number" integer NOT NULL,
	"estimated_duration" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"enrollment_id" integer NOT NULL,
	"module_id" integer,
	"content_id" integer,
	"status" text DEFAULT 'not_started',
	"time_spent" integer DEFAULT 0,
	"completed_at" timestamp,
	"score" numeric(5, 2),
	"max_score" numeric(5, 2),
	"attempts" integer DEFAULT 0,
	"last_attempt_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lms_quiz_answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"progress_id" integer NOT NULL,
	"question_id" text NOT NULL,
	"user_answer" jsonb,
	"correct_answer" jsonb,
	"is_correct" boolean DEFAULT false,
	"points" numeric(5, 2) DEFAULT '0.00',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"transaction_id" integer NOT NULL,
	"sender_id" integer NOT NULL,
	"content" text NOT NULL,
	"is_system_message" boolean DEFAULT false,
	"flagged_as_scam" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "password_resets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "password_resets_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "penetration_tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"test_type" text NOT NULL,
	"scope" text NOT NULL,
	"status" text DEFAULT 'scheduled',
	"scheduled_date" timestamp NOT NULL,
	"started_at" timestamp,
	"completed_at" timestamp,
	"critical_findings" integer DEFAULT 0,
	"high_findings" integer DEFAULT 0,
	"medium_findings" integer DEFAULT 0,
	"low_findings" integer DEFAULT 0,
	"overall_score" numeric(5, 2),
	"report_url" text,
	"certificate_url" text,
	"remediation_required" boolean DEFAULT false,
	"remediation_completed" boolean DEFAULT false,
	"remediation_due_date" timestamp,
	"next_test_due" timestamp,
	"compliance_passed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "phone_number_flags" (
	"id" serial PRIMARY KEY NOT NULL,
	"phone_number" text NOT NULL,
	"country_code" text,
	"region" text,
	"carrier" text,
	"is_scam" boolean DEFAULT false,
	"is_spam" boolean DEFAULT false,
	"is_robo" boolean DEFAULT false,
	"is_spoofed" boolean DEFAULT false,
	"risk_level" text DEFAULT 'unknown',
	"fraud_score" numeric(5, 2) DEFAULT '0.00',
	"scam_types" jsonb,
	"reported_activities" jsonb,
	"report_count" integer DEFAULT 0,
	"verified_scam" boolean DEFAULT false,
	"verified_legitimate" boolean DEFAULT false,
	"verified_by" integer,
	"first_reported" timestamp DEFAULT now(),
	"last_reported" timestamp DEFAULT now(),
	"analysis_source" text,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "phone_number_flags_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "sanctions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"sanction_type" text NOT NULL,
	"reason" text NOT NULL,
	"description" text,
	"severity" integer DEFAULT 1,
	"automatic_sanction" boolean DEFAULT false,
	"triggered_by" text,
	"dispute_id" integer,
	"duration_hours" integer,
	"is_active" boolean DEFAULT true,
	"applied_by" integer,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"revoked_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "scam_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"reporter_id" integer NOT NULL,
	"scammer_info" text NOT NULL,
	"scam_type" text NOT NULL,
	"description" text NOT NULL,
	"evidence" jsonb,
	"status" text DEFAULT 'pending',
	"is_public" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"reviewed_at" timestamp,
	"reviewed_by" integer
);
--> statement-breakpoint
CREATE TABLE "security_incidents" (
	"id" serial PRIMARY KEY NOT NULL,
	"incident_type" text NOT NULL,
	"severity" text DEFAULT 'medium',
	"status" text DEFAULT 'detected',
	"description" text NOT NULL,
	"affected_systems" jsonb,
	"source_ip" text,
	"user_agent" text,
	"attack_vector" text,
	"auto_mitigated" boolean DEFAULT false,
	"ip_blacklisted" boolean DEFAULT false,
	"soc_notified" boolean DEFAULT false,
	"response_time" integer,
	"mitigation_time" integer,
	"assigned_to" integer,
	"escalation_level" integer DEFAULT 1,
	"playbook_executed" text,
	"evidence" jsonb,
	"resolution" text,
	"created_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"amount" numeric(12, 2) NOT NULL,
	"currency" text DEFAULT 'GBP',
	"status" text DEFAULT 'pending',
	"buyer_id" integer NOT NULL,
	"seller_id" integer NOT NULL,
	"stripe_payment_intent_id" text,
	"milestones" jsonb,
	"kyc_status" text DEFAULT 'pending',
	"kyb_status" text DEFAULT 'not_required',
	"aml_status" text DEFAULT 'pending',
	"verification_completed_at" timestamp,
	"escrow_amount" numeric(12, 2),
	"escrow_status" text DEFAULT 'not_initiated',
	"escrow_deposited_at" timestamp,
	"funds_released_at" timestamp,
	"service_started_at" timestamp,
	"service_completed_at" timestamp,
	"delivery_confirmed_by" integer,
	"buffer_period_hours" integer DEFAULT 72,
	"buffer_start_time" timestamp,
	"buffer_end_time" timestamp,
	"dispute_window_hours" integer DEFAULT 72,
	"dispute_deadline" timestamp,
	"risk_score" numeric(5, 2) DEFAULT '0.00',
	"fraud_flags" jsonb,
	"auto_sanctioned" boolean DEFAULT false,
	"escalation_level" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"email" text NOT NULL,
	"password" text,
	"first_name" text,
	"last_name" text,
	"profile_image" text,
	"auth_provider" text DEFAULT 'local',
	"google_id" text,
	"is_verified" boolean DEFAULT false,
	"mfa_enabled" boolean DEFAULT false,
	"mfa_secret" text,
	"mfa_backup_codes" jsonb,
	"last_mfa_used" timestamp,
	"role" text DEFAULT 'user',
	"client_org_id" text,
	"permission_overrides" jsonb,
	"session_count" integer DEFAULT 0,
	"max_sessions" integer DEFAULT 3,
	"last_login_at" timestamp,
	"last_login_ip" text,
	"trust_score" numeric(5, 2) DEFAULT '0.00',
	"verification_level" text DEFAULT 'none',
	"is_admin" boolean DEFAULT false,
	"seller_tier" text DEFAULT 'new',
	"completed_transactions" integer DEFAULT 0,
	"successful_transactions" integer DEFAULT 0,
	"disputes_against" integer DEFAULT 0,
	"valid_disputes" integer DEFAULT 0,
	"sanction_level" integer DEFAULT 0,
	"sanction_reason" text,
	"sanctioned_until" timestamp,
	"fast_release_eligible" boolean DEFAULT false,
	"requires_extended_buffer" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE "website_analysis" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"domain" text NOT NULL,
	"risk_score" numeric(5, 2) NOT NULL,
	"risk_factors" jsonb,
	"has_valid_ssl" boolean DEFAULT false,
	"certificate_issuer" text,
	"domain_age" integer,
	"page_load_time" integer,
	"suspicious_keywords" jsonb,
	"has_password_fields" boolean DEFAULT false,
	"has_payment_forms" boolean DEFAULT false,
	"external_links_count" integer DEFAULT 0,
	"visual_similarity" jsonb,
	"logo_analysis" jsonb,
	"color_scheme_analysis" jsonb,
	"redirection_chain" jsonb,
	"cookie_analysis" jsonb,
	"tracking_scripts" jsonb,
	"category" text,
	"confidence" numeric(5, 2) DEFAULT '0.00',
	"is_legitimate" boolean,
	"analysis_version" text,
	"user_agent" text,
	"analyzed_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "aml_checks" ADD CONSTRAINT "aml_checks_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aml_checks" ADD CONSTRAINT "aml_checks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aml_checks" ADD CONSTRAINT "aml_checks_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_developer_id_developer_accounts_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."developer_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage_logs" ADD CONSTRAINT "api_usage_logs_api_key_id_api_keys_id_fk" FOREIGN KEY ("api_key_id") REFERENCES "public"."api_keys"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage_logs" ADD CONSTRAINT "api_usage_logs_developer_id_developer_accounts_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."developer_accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arbitration_cases" ADD CONSTRAINT "arbitration_cases_dispute_id_disputes_id_fk" FOREIGN KEY ("dispute_id") REFERENCES "public"."disputes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_client_org_id_client_organizations_id_fk" FOREIGN KEY ("client_org_id") REFERENCES "public"."client_organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "developer_accounts" ADD CONSTRAINT "developer_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "developer_accounts" ADD CONSTRAINT "developer_accounts_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_raised_by_users_id_fk" FOREIGN KEY ("raised_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_resolved_by_users_id_fk" FOREIGN KEY ("resolved_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_assigned_agent_users_id_fk" FOREIGN KEY ("assigned_agent") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domain_trust_scores" ADD CONSTRAINT "domain_trust_scores_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "escalation_queue" ADD CONSTRAINT "escalation_queue_dispute_id_disputes_id_fk" FOREIGN KEY ("dispute_id") REFERENCES "public"."disputes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fraud_reports" ADD CONSTRAINT "fraud_reports_reporter_id_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fraud_reports" ADD CONSTRAINT "fraud_reports_target_user_id_users_id_fk" FOREIGN KEY ("target_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fraud_reports" ADD CONSTRAINT "fraud_reports_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurance_claims" ADD CONSTRAINT "insurance_claims_coverage_id_insurance_coverage_id_fk" FOREIGN KEY ("coverage_id") REFERENCES "public"."insurance_coverage"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurance_claims" ADD CONSTRAINT "insurance_claims_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurance_coverage" ADD CONSTRAINT "insurance_coverage_client_org_id_client_organizations_id_fk" FOREIGN KEY ("client_org_id") REFERENCES "public"."client_organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "insurance_coverage" ADD CONSTRAINT "insurance_coverage_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ip_blacklist" ADD CONSTRAINT "ip_blacklist_incident_id_security_incidents_id_fk" FOREIGN KEY ("incident_id") REFERENCES "public"."security_incidents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyb_verifications" ADD CONSTRAINT "kyb_verifications_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyb_verifications" ADD CONSTRAINT "kyb_verifications_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_documents" ADD CONSTRAINT "kyc_documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_documents" ADD CONSTRAINT "kyc_documents_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_documents" ADD CONSTRAINT "kyc_documents_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_verifications" ADD CONSTRAINT "kyc_verifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kyc_verifications" ADD CONSTRAINT "kyc_verifications_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_business_enrollments" ADD CONSTRAINT "lms_business_enrollments_business_plan_id_lms_business_plans_id_fk" FOREIGN KEY ("business_plan_id") REFERENCES "public"."lms_business_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_business_enrollments" ADD CONSTRAINT "lms_business_enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_business_enrollments" ADD CONSTRAINT "lms_business_enrollments_enrollment_id_lms_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."lms_enrollments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_business_enrollments" ADD CONSTRAINT "lms_business_enrollments_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_business_plans" ADD CONSTRAINT "lms_business_plans_admin_user_id_users_id_fk" FOREIGN KEY ("admin_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_certifications" ADD CONSTRAINT "lms_certifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_certifications" ADD CONSTRAINT "lms_certifications_course_id_lms_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."lms_courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_certifications" ADD CONSTRAINT "lms_certifications_enrollment_id_lms_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."lms_enrollments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_content" ADD CONSTRAINT "lms_content_module_id_lms_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."lms_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_enrollments" ADD CONSTRAINT "lms_enrollments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_enrollments" ADD CONSTRAINT "lms_enrollments_course_id_lms_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."lms_courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_modules" ADD CONSTRAINT "lms_modules_course_id_lms_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."lms_courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_progress" ADD CONSTRAINT "lms_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_progress" ADD CONSTRAINT "lms_progress_enrollment_id_lms_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."lms_enrollments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_progress" ADD CONSTRAINT "lms_progress_module_id_lms_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."lms_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_progress" ADD CONSTRAINT "lms_progress_content_id_lms_content_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."lms_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lms_quiz_answers" ADD CONSTRAINT "lms_quiz_answers_progress_id_lms_progress_id_fk" FOREIGN KEY ("progress_id") REFERENCES "public"."lms_progress"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_transaction_id_transactions_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "phone_number_flags" ADD CONSTRAINT "phone_number_flags_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sanctions" ADD CONSTRAINT "sanctions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sanctions" ADD CONSTRAINT "sanctions_dispute_id_disputes_id_fk" FOREIGN KEY ("dispute_id") REFERENCES "public"."disputes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sanctions" ADD CONSTRAINT "sanctions_applied_by_users_id_fk" FOREIGN KEY ("applied_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scam_reports" ADD CONSTRAINT "scam_reports_reporter_id_users_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scam_reports" ADD CONSTRAINT "scam_reports_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "security_incidents" ADD CONSTRAINT "security_incidents_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_seller_id_users_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_delivery_confirmed_by_users_id_fk" FOREIGN KEY ("delivery_confirmed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;