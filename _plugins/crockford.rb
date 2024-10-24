require 'crockford32'

module Jekyll
  module CrockfordFilter
    def crockford_encode(input)
      "#{Crockford32.encode(input)}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::CrockfordFilter)
