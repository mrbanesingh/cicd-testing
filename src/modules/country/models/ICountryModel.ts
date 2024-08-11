import { IApplicationSeedModel } from "./IApplicationSeedModel";
import { ILanguageSeedModel } from "./ILanguageSeedModel";
import { Document } from "mongoose";

export interface ICountryModel {
  country_code?: string;
  mobile_number_prefix: string;
  name: string;
  display_name: string;
  local_currency_symbol: string;
  local_currency_name: string;
  flag_base_url: string;
  flag_location_url: string;
  flag_url: string;
  mobile_number_length_min: number;
  mobile_number_length_max: number;
  number_of_kids_limit: number;
  number_of_spouse_limit: number;
  terms_and_conditions: string;
  privacy_policy: string;
  otp_expire_time: number;
  otp_resend_time: number;
  otp_attempt_limit: number;
  otp_cooldown_limit: number;
  is_kid_dob_editable: boolean;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string;
  created_date: Date;
  updated_by: string;
  updated_date: Date;
  count?: Number;
  languages: ILanguageSeedModel[];
  applications: IApplicationSeedModel[];
}
