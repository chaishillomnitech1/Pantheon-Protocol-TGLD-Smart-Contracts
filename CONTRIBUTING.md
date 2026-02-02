# Contributing to Pantheon Protocol

Thank you for your interest in contributing to the Pantheon Protocol! This project aims to immortalize the legacies of monumental Black achievers through blockchain technology.

## 🎯 Mission

The Pantheon Protocol preserves and immortalizes the legacies of monumental Black achievers in the ScrollVerse by:
- Embedding their stories, art, and cultural legacies as NFTs
- Ensuring perpetual equity through royalty distribution
- Making their contributions accessible and eternal through decentralized technology

## 🤝 How to Contribute

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Write/update tests** for your changes
5. **Ensure all tests pass**
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m "feat: description of your changes"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request**

### Commit Message Guidelines

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

Example:
```
feat: add batch minting functionality for legacy NFTs
```

## 🔍 Development Setup

### Prerequisites

- Node.js v18+ (v22.10.0+ recommended)
- npm or yarn
- Git

### Setup Steps

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Pantheon-Protocol-TGLD-Smart-Contracts.git
   cd Pantheon-Protocol-TGLD-Smart-Contracts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Compile contracts**
   ```bash
   npm run compile
   ```

5. **Run tests**
   ```bash
   npm test
   ```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with gas reporting
REPORT_GAS=true npm test

# Run specific test file
npx hardhat test test/PantheonNFT.test.js
```

### Writing Tests

- Write comprehensive tests for all new features
- Ensure edge cases are covered
- Follow existing test patterns in `test/PantheonNFT.test.js`
- Aim for high code coverage

Example test structure:
```javascript
describe("Feature Name", function () {
  beforeEach(async function () {
    // Setup
  });

  it("Should perform expected behavior", async function () {
    // Test implementation
    expect(result).to.equal(expected);
  });
});
```

## 📝 Documentation

### Code Documentation

- Add JSDoc comments for all public functions
- Include parameter descriptions and return values
- Document complex logic with inline comments
- Update README.md for user-facing changes

### Example:

```solidity
/**
 * @dev Mints a new legacy NFT to immortalize a Black achiever
 * @param to Address to receive the NFT
 * @param achieverName Name of the achiever being immortalized
 * @param category Category of achievement
 * @param birthYear Birth year of the achiever
 * @param uri Token URI containing metadata
 * @return tokenId The ID of the newly minted token
 */
function mintLegacy(...) public returns (uint256) {
    // Implementation
}
```

## 🔒 Security Guidelines

### Security Best Practices

1. **Never commit private keys** or sensitive data
2. **Use OpenZeppelin** battle-tested contracts when possible
3. **Follow access control** patterns for privileged functions
4. **Validate all inputs** in smart contract functions
5. **Test for reentrancy** and other common vulnerabilities
6. **Document security assumptions** in code

### Reporting Security Issues

If you discover a security vulnerability:
1. **DO NOT** open a public issue
2. Email the maintainers privately
3. Include details about the vulnerability
4. Wait for acknowledgment before disclosing

## 🎨 Code Style

### Solidity

- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use OpenZeppelin naming conventions
- Maximum line length: 120 characters
- Use 4 spaces for indentation

### JavaScript/TypeScript

- Use consistent naming conventions
- Follow existing code patterns
- Use async/await for promises
- Handle errors appropriately

## 🌟 Feature Requests

Have an idea? We'd love to hear it!

1. Check existing issues to avoid duplicates
2. Open a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Potential implementation approach
3. Tag it with `enhancement`

## 🐛 Bug Reports

Found a bug? Help us fix it!

1. Check if it's already reported
2. Open a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots if applicable
3. Tag it with `bug`

## 📋 Pull Request Process

1. **Update documentation** for any user-facing changes
2. **Add tests** for new functionality
3. **Ensure all tests pass** locally
4. **Update CHANGELOG** if applicable
5. **Request review** from maintainers
6. **Address feedback** promptly
7. **Squash commits** if requested

### PR Checklist

- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Commits are well-described
- [ ] No sensitive data committed
- [ ] Breaking changes documented

## 🎓 Learning Resources

### Smart Contract Development

- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Hardhat Guide](https://hardhat.org/getting-started/)
- [ERC-721 Standard](https://eips.ethereum.org/EIPS/eip-721)
- [ERC-2981 Standard](https://eips.ethereum.org/EIPS/eip-2981)

### Scroll Network

- [Scroll Documentation](https://docs.scroll.io/)
- [Scroll Developer Guide](https://docs.scroll.io/en/developers/)

## 💬 Community

- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for questions
- **Code of Conduct**: Be respectful and inclusive

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

All contributors will be recognized in our README and project documentation.

---

**Thank you for helping preserve the legacies of monumental Black achievers! Together, we ensure their contributions echo eternally in the ScrollVerse.**
