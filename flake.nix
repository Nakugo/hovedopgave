{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
        gdk = pkgs.google-cloud-sdk.withExtraComponents (
          with pkgs.google-cloud-sdk.components;
          [
            app-engine-go
          ]
        );
      in
      with pkgs;
      {
        devShells.default = mkShell {
          buildInputs = [ gdk ];
        };
      }
    );
}
