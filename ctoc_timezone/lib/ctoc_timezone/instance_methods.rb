module CToCTimezone
  module InstanceMethods
    def ctoc_timezone
      self.in_time_zone("Chennai")
    end
  end
end
