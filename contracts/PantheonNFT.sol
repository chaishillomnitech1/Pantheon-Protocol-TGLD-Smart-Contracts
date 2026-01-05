// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title PantheonNFT
 * @dev NFT contract for immortalizing monumental Black achievers in the ScrollVerse.
 * Each NFT represents a digital artifact preserving their stories, art, and cultural legacies.
 * Implements ERC-2981 for perpetual royalty distribution to ensure lasting equity.
 */
contract PantheonNFT is ERC721, ERC721URIStorage, ERC2981, AccessControl {
    // Role for minting new legacy NFTs
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    // Counter for token IDs
    uint256 private _nextTokenId;
    
    // Default royalty percentage (in basis points, e.g., 500 = 5%)
    uint96 public constant DEFAULT_ROYALTY_FEE = 500; // 5%
    
    // Struct to store legacy information
    struct LegacyMetadata {
        string achieverName;
        string category; // e.g., "Scientist", "Artist", "Activist", "Leader"
        uint256 birthYear;
        uint256 mintTimestamp;
        address minter;
    }
    
    // Mapping from token ID to legacy metadata
    mapping(uint256 => LegacyMetadata) private _legacyData;
    
    // Events
    event LegacyMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        string achieverName,
        string category,
        string tokenURI
    );
    
    event RoyaltyUpdated(
        uint256 indexed tokenId,
        address indexed receiver,
        uint96 feeNumerator
    );

    /**
     * @dev Constructor sets up the contract with name, symbol, and default admin
     * @param defaultAdmin Address to receive the default admin role
     * @param defaultRoyaltyReceiver Address to receive default royalties
     */
    constructor(
        address defaultAdmin,
        address defaultRoyaltyReceiver
    ) ERC721("Pantheon Protocol Legacy", "PANTHEON") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, defaultAdmin);
        
        // Set default royalty for all tokens
        _setDefaultRoyalty(defaultRoyaltyReceiver, DEFAULT_ROYALTY_FEE);
    }

    /**
     * @dev Mints a new legacy NFT to immortalize a Black achiever
     * @param to Address to receive the NFT
     * @param achieverName Name of the achiever being immortalized
     * @param category Category of achievement (e.g., "Scientist", "Artist")
     * @param birthYear Birth year of the achiever
     * @param uri Token URI containing metadata (IPFS hash or other decentralized storage)
     * @return tokenId The ID of the newly minted token
     */
    function mintLegacy(
        address to,
        string memory achieverName,
        string memory category,
        uint256 birthYear,
        string memory uri
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        // Store legacy metadata
        _legacyData[tokenId] = LegacyMetadata({
            achieverName: achieverName,
            category: category,
            birthYear: birthYear,
            mintTimestamp: block.timestamp,
            minter: msg.sender
        });
        
        emit LegacyMinted(tokenId, to, achieverName, category, uri);
        
        return tokenId;
    }

    /**
     * @dev Sets royalty information for a specific token
     * @param tokenId Token ID to set royalty for
     * @param receiver Address to receive royalties
     * @param feeNumerator Royalty fee in basis points (e.g., 500 = 5%)
     */
    function setTokenRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 feeNumerator
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
        emit RoyaltyUpdated(tokenId, receiver, feeNumerator);
    }

    /**
     * @dev Updates the default royalty for all tokens
     * @param receiver Address to receive royalties
     * @param feeNumerator Royalty fee in basis points
     */
    function setDefaultRoyalty(
        address receiver,
        uint96 feeNumerator
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    /**
     * @dev Returns legacy metadata for a token
     * @param tokenId Token ID to query
     * @return Legacy metadata struct
     */
    function getLegacyMetadata(uint256 tokenId) public view returns (LegacyMetadata memory) {
        require(_exists(tokenId), "PantheonNFT: Token does not exist");
        return _legacyData[tokenId];
    }

    /**
     * @dev Returns the total number of tokens minted
     * @return Total supply
     */
    function totalSupply() public view returns (uint256) {
        return _nextTokenId;
    }

    // Required overrides
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC2981, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721)
        returns (address)
    {
        address previousOwner = super._update(to, tokenId, auth);
        
        // If burning (to == address(0)), clean up data
        if (to == address(0)) {
            _resetTokenRoyalty(tokenId);
            delete _legacyData[tokenId];
        }
        
        return previousOwner;
    }

    /**
     * @dev Internal function to check token existence
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}
