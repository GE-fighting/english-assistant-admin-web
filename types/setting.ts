export interface ModelProvider {
    provider_id?: number;
    provider_name?: string;
    api_base_url?: string;
    api_key_required?: boolean;
    model_types?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  }