module Plugins
  # The Plugins::Export module will be filled in with functionality by the 
  # different export plugins installed in this dradis instance. The 
  # ExportController will expose this functionality through an standarised
  # interface.
  module Export
  end
end

# The ExportContoller will be the centralised point from which all the 
# functionality exposed by plugins is made available to the user.
class ExportController < ApplicationController
  include Plugins::Export
  before_filter :prepare_params, :except => [:list]

  # This method provides a list of all the available export options. It 
  # assumes that each export plugin inclides instance methods in the
  # Plugins::Export mixing.
  def list
    render :text => Plugins::Export.instance_methods().join(',')
  end

  private
  def prepare_params
  end
end