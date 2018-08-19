module CToCTimezone

  module InstanceMethods

    def ctoc_timezone (insta_load=false, run_call_back_script=false, call_back_script="")
      time_string = modify_time
      if is_production?
        "<div data-ctoc-timezone=\"server\" data-ctoc-time=\""+time_string+"\" data-ctoc-callback=\'#{call_back_script}\'></div>"
      else
        "<div data-ctoc-timezone=\"server\" data-ctoc-time=\""+time_string+"\" data-ctoc-callback=\'#{call_back_script}\' >js error: check if js library is attached</div>"
      end
    end

    private

    def is_production?
      ::Rails.env.production?
    end

    def modify_time
      self.utc.strftime("%m/%d/%Y %I:%M:%S %p UTC")
    end

    # def generate_ctoc_string
  
    # end
  end
end

#(format_string = "",time_zone="", insta_load=false, run_call_back_script=false,call_back_script="", append_front="", append_end=""
# "<div data-ctoc-timezone=\"server\" data-ctoc-time=\""+time_string+"\" data-ctoc-format=\""+format_string+"\" date-ctoc-timezone=\""+time_zone+"\"></div>"