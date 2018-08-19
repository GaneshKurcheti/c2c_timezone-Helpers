require "ctoc_timezone/version"

require File.expand_path('ctoc_timezone/class_methods', File.dirname(__FILE__))
require File.expand_path('ctoc_timezone/instance_methods', File.dirname(__FILE__))
#
# DateTime class extension.
#
class DateTime
  extend CToCTimezone::ClassMethods
  include CToCTimezone::InstanceMethods
  def env_determine
    ::Rails.env.production?
  end
end
#
# In rails the DateTime Objects are converted to the TimeWithZone class.
#
class ActiveSupport::TimeWithZone
  extend CToCTimezone::ClassMethods
  include CToCTimezone::InstanceMethods
  def env_determine
    ::Rails.env.production?
  end
end
