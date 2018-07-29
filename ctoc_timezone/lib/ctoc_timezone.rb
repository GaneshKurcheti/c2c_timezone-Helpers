require "ctoc_timezone/version"

require File.expand_path('ctoc_timezone/class_methods', File.dirname(__FILE__))
require File.expand_path('ctoc_timezone/instance_methods', File.dirname(__FILE__))
#
# DateTime class extension.
#
class DateTime
  extend CToCTimezone::ClassMethods
  include CToCTimezone::InstanceMethods
end
